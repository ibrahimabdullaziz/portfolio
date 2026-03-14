import { parseBoldText, parseTemplate } from '@/lib/hero';
import { cn } from '@/lib/utils';
import { describe, expect, it } from 'vitest';

describe('lib/hero', () => {
  const mockSkills = [
    { name: 'TypeScript', href: 'https://ts.com', component: 'TypeScript' },
    { name: 'React', href: 'https://react.com', component: 'React' },
  ];

  describe('parseTemplate', () => {
    it('parses skills correctly', () => {
      const template = 'I love {skills:0} and {skills:1}.';
      const result = parseTemplate(template, mockSkills as any);

      expect(result).toHaveLength(5);
      expect(result[1]).toEqual({
        type: 'skill',
        skill: mockSkills[0],
        key: 1,
      });
      expect(result[3]).toEqual({
        type: 'skill',
        skill: mockSkills[1],
        key: 3,
      });
    });

    it('parses bold text correctly', () => {
      const template = 'This is <b>bold</b>.';
      const result = parseTemplate(template, []);

      expect(result).toHaveLength(3);
      expect(result[1]).toEqual({ type: 'bold', text: 'bold', key: '0-1' });
    });

    it('handles mixed skills and bold text', () => {
      const template = '<b>Hi</b>, I use {skills:0}.';
      const result = parseTemplate(template, mockSkills as any);

      // Implementation results: ['', '<b>Hi</b>', ', I use ', '{skills:0}', '.']
      // Some are split further by bold logic
      expect(result.length).toBeGreaterThanOrEqual(4);
      const boldPart = result.find((r) => r.type === 'bold') as any;
      expect(boldPart?.text).toBe('Hi');
      const skillPart = result.find((r) => r.type === 'skill') as any;
      expect(skillPart?.skill).toEqual(mockSkills[0]);
    });
  });

  describe('parseBoldText', () => {
    it('splits bold and normal text into segments', () => {
      const text = 'Normal <b>Bold</b> Still Normal';
      const segments = parseBoldText(text);

      expect(segments).toHaveLength(3);
      expect(segments[0]).toEqual({ text: 'Normal ', bold: false, key: 0 });
      expect(segments[1]).toEqual({ text: 'Bold', bold: true, key: 1 });
      expect(segments[2]).toEqual({
        text: ' Still Normal',
        bold: false,
        key: 2,
      });
    });
  });
});

describe('lib/utils', () => {
  describe('cn', () => {
    it('merges tailwind classes correctly', () => {
      expect(cn('px-2', 'py-2')).toBe('px-2 py-2');
      expect(cn('px-2 py-2', 'p-4')).toBe('p-4'); // tailwind-merge in action
      expect(cn('bg-red-500', { 'bg-blue-500': true })).toBe('bg-blue-500');
      expect(cn('fixed', false && 'hidden')).toBe('fixed');
    });
  });
});
