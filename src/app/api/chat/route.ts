import { systemPrompt } from '@/config/ChatPrompt';
import {
  RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_WINDOW,
  chatSchema,
  checkRateLimit,
  getClientIP,
  sanitizeInput,
} from '@/lib/chat-utils';
import { createParser } from 'eventsource-parser';
import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';

// Rate limit store and helper functions moved to @/lib/chat-utils.ts

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(clientIP);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter: RATE_LIMIT_WINDOW / 1000,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': (Date.now() + RATE_LIMIT_WINDOW).toString(),
          },
        },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY not configured');
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 },
      );
    }

    const body = await request.json();
    const validatedData = chatSchema.parse(body);

    // Prepare the request body for Gemini REST API
    const requestBody = {
      system_instruction: {
        parts: [{ text: systemPrompt }],
      },
      contents: [
        // Add conversation history
        ...validatedData.history.map((msg) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: msg.parts.map((part) => ({
            text: msg.role === 'user' ? sanitizeInput(part.text) : part.text,
          })),
        })),
        // Add current message
        {
          role: 'user',
          parts: [{ text: sanitizeInput(validatedData.message) }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 512,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    };

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse`;

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      console.error('Gemini API error:', response.status, errorBody);

      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please wait a moment and try again.' },
          { status: 429 },
        );
      }

      throw new Error(`Gemini API error: ${response.status}`);
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const parser = createParser({
            onEvent: (event) => {
              try {
                const data = JSON.parse(event.data);
                const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                  // Send as Server-Sent Event format
                  const sseData = `data: ${JSON.stringify({ text })}\n\n`;
                  controller.enqueue(encoder.encode(sseData));
                }
              } catch (parseError) {
                console.error('Parse error:', parseError);
              }
            },
          });

          if (!response.body) {
            throw new Error('No response body');
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            parser.feed(decoder.decode(value));
          }

          // Send completion signal
          controller.enqueue(encoder.encode('data: {"done": true}\n\n'));
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          const errorData = `data: ${JSON.stringify({ error: 'Stream error occurred' })}\n\n`;
          controller.enqueue(encoder.encode(errorData));
          controller.close();
        }
      },
    });

    const allowedOrigins = [
      'http://localhost:3000',
      'https://ibrahim-abdullaziz.vercel.app',
      process.env.NEXT_PUBLIC_URL || '',
    ].filter(Boolean);

    const origin = request.headers.get('origin') || '';
    const allowOrigin = allowedOrigins.includes(origin)
      ? origin
      : allowedOrigins[0];

    return new NextResponse(stream, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': allowOrigin,
        'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
      },
    });
  } catch (error) {
    console.error('Chat API Error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid request data',
          details: error.errors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
