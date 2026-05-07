import { projects } from '@/config/Projects';
import {
  ProjectCaseStudy,
  ProjectCaseStudyFrontmatter,
  ProjectCaseStudyPreview,
} from '@/types/project';

/**
 * Case study content for each project, keyed by slug.
 * This replaces the old "Full case study coming soon." placeholder.
 */
const caseStudyContent: Record<string, { content: string; challenges?: string[]; learnings?: string[]; timeline?: string }> = {
  vsync: {
    content: `## The Problem

Existing video interview tools force engineers to switch between 3+ apps during live technical interviews — a video call app, a separate code editor, and a note-taking tool. This context-switching wastes time, breaks focus, and creates a fragmented experience for both interviewers and candidates.

## Technical Decisions

**Real-Time Code Collaboration:** I integrated Monaco Editor (the engine behind VS Code) to provide a familiar coding environment. Code changes sync in real time across all participants using Convex's reactive data layer — no polling, no WebSocket boilerplate.

**Video Infrastructure:** Stream Video SDK handles HD video/audio over WebRTC, supporting both peer-to-peer and group interview sessions. I implemented pre-flight device testing so candidates can verify their camera and microphone before the interview starts.

**Serverless Architecture:** Convex replaces the traditional REST API + database stack. It provides real-time data sync and event-driven server functions, which eliminated the need for managing WebSocket servers or database connections.

**Authentication:** Clerk handles multi-provider auth with session management, allowing interviewers to create secure, invite-only interview rooms.

**Accessible UI:** Built with Shadcn/Radix component primitives, ensuring WCAG compliance. The interface includes dark mode support, resizable split-pane layouts, and keyboard navigation throughout.

## The Outcome

Reduced tool context-switching to zero during live technical interview sessions. Interviewers and candidates stay in a single tab with live code editing, HD video, and assessment tools. The app achieves Core Web Vitals scores of LCP < 2.5s and FID < 100ms, with code splitting and lazy loading keeping the initial bundle lean.`,
    challenges: [
      'Synchronizing Monaco Editor state across multiple users without conflicts required implementing operational transform logic through Convex mutations.',
      'Managing WebRTC connection lifecycle (ICE candidates, TURN fallback) while keeping the UI responsive during network fluctuations.',
      'Designing resizable split-pane layouts that work across screen sizes while maintaining video aspect ratios.',
    ],
    learnings: [
      'Convex reactive queries eliminate the need for manual cache invalidation — data updates propagate automatically to all connected clients.',
      'Pre-flight device testing reduces interview no-shows caused by last-minute technical issues by catching problems before the session starts.',
      'Serverless architectures significantly reduce DevOps overhead for real-time applications but require careful thinking about data modeling.',
    ],
    timeline: 'January 2025 – March 2025',
  },
  urmoviez: {
    content: `## The Problem

Movie discovery apps often suffer from slow loading times, poor search UX, and janky transitions that break the cinematic browsing experience. Users abandon the app when pagination feels sluggish or filters don't respond instantly.

## Technical Decisions

**React 19 Concurrency:** I leveraged Suspense boundaries and deferred rendering (useTransition, useDeferredValue) to keep the UI responsive while loading large data sets. This means the search input never lags, even when filtering across 10,000+ titles.

**Data Fetching Strategy:** TanStack Query v5 handles all server state — with staleTime and gcTime tuned for the TMDB API rate limits. Pagination uses keepPreviousData to avoid layout shifts, and infinite scroll uses intersection observer triggers. Request deduplication prevents duplicate API calls when components re-render.

**Animation Layer:** Framer Motion powers page transitions (shared layout animations between movie cards and detail views), creating a seamless browsing experience that feels native rather than web-based.

**Responsive Grid:** Tailwind CSS v4 grid system adapts from 1 column on mobile to 5 columns on desktop, with consistent spacing and typography scales.

## The Outcome

A cinema discovery platform serving 10,000+ titles with smooth page transitions, instant search filtering, and zero layout shifts during pagination. The responsive grid works seamlessly across all screen sizes.`,
    challenges: [
      'TMDB API rate limits required implementing request queuing and intelligent caching strategies.',
      'Shared layout animations between list and detail views needed careful key management to avoid animation glitches.',
      'Balancing image quality with load times across different network conditions.',
    ],
    learnings: [
      'React 19 concurrent features dramatically improve perceived performance — the UI stays responsive even during heavy data processing.',
      'TanStack Query v5 keepPreviousData is essential for pagination UX — it prevents content flashing between page loads.',
      'Framer Motion shared layout animations create a native app feel that significantly improves user engagement.',
    ],
    timeline: 'February 2025',
  },
  'react-hooks-store': {
    content: `## The Problem

Most React state management libraries (Redux, Zustand, Jotai) abstract away how reactivity actually works. Junior developers use them without understanding the subscription and rendering mechanics underneath. I wanted to build a state manager from scratch to demonstrate these internals.

## Technical Decisions

**Observer Pattern:** The store uses a publish-subscribe model. Each slice maintains a set of subscriber callbacks. When state changes, only subscribed components re-render — not the entire tree.

**Redux-Style API:** The external API mirrors Redux Toolkit's createSlice pattern (slices, actions, selectors) so developers can compare the custom implementation with the industry standard and understand what Redux does under the hood.

**Selective Re-Renders:** Components that only dispatch actions (write-only) can opt out of re-renders by setting shouldListen: false. This demonstrates a key React performance concept — separating state producers from state consumers.

**Zero Dependencies:** The entire library uses only React's built-in hooks (useState, useEffect, useRef, useSyncExternalStore). No external packages. This proves that a production-capable state manager can be built with React primitives alone.

## The Outcome

A fully functional global state manager that teaches React rendering internals through practical code. The Observer Pattern implementation shows exactly how libraries like Redux and Zustand manage subscriptions and trigger re-renders.`,
    challenges: [
      'Preventing stale closures in subscriber callbacks required careful use of useRef to always reference the latest state.',
      'Implementing useSyncExternalStore correctly to avoid tearing in concurrent React rendering.',
    ],
    learnings: [
      'Building a state manager from scratch provides deep understanding of React\'s rendering lifecycle and subscription patterns.',
      'The Observer Pattern is the foundational design pattern behind most reactive state management libraries.',
    ],
    timeline: 'January 2025',
  },
  'job-bot': {
    content: `## The Problem

Job seekers in the Middle East and remote frontend market manually check 8+ job boards daily — LinkedIn, Wuzzuf, Bayt, GulfTalent, Remotive, and Himalayas. This manual process wastes hours and causes qualified candidates to miss time-sensitive postings.

## Technical Decisions

**Concurrent Scraping:** Python's asyncio.gather runs all scrapers concurrently, reducing total scrape time from minutes to seconds. Each scraper is implemented as an independent async function with its own retry logic and error handling.

**Deduplication:** SQLite stores job fingerprints (hash of title + company + URL) to prevent duplicate postings. The database runs as a single file alongside the bot, requiring zero infrastructure setup.

**Telegram Bot API:** Results are formatted as rich Telegram messages with job title, company, location, and direct apply links. The channel has grown to 1,400+ subscribers organically.

**Docker + Railway:** The bot runs 24/7 as a Docker container on Railway. Health checks and automatic restarts ensure continuous operation without manual intervention.

## The Outcome

A production automation tool serving 1,400+ subscribers with daily job updates from 8+ boards. The entire system runs autonomously — no browser automation, no Selenium, no headless Chrome — just pure HTTP requests with httpx.`,
    challenges: [
      'Each job board has a different HTML structure and anti-scraping measures, requiring custom parsing logic and rotating headers.',
      'Rate limiting Telegram API calls to avoid hitting the 30 messages/second limit while posting batch results.',
    ],
    learnings: [
      'asyncio.gather provides massive performance gains for I/O-bound tasks — scraping 8 boards concurrently is nearly as fast as scraping 1.',
      'SQLite is underrated for single-process applications — it provides ACID guarantees without any server setup.',
      'Docker on Railway is a zero-ops deployment strategy that works surprisingly well for always-on automation bots.',
    ],
    timeline: '2024 – Present',
  },
};

/**
 * Get all project case study files from the projects directory
 */
export function getProjectCaseStudySlugs(): string[] {
  return projects.map((p) =>
    p.projectDetailsPageSlug.replace('/projects/', ''),
  );
}

/**
 * Get project case study by slug with full content
 */
export function getProjectCaseStudyBySlug(
  slug: string,
): ProjectCaseStudy | null {
  const project = projects.find(
    (p) => p.projectDetailsPageSlug === `/projects/${slug}`,
  );
  if (!project) return null;

  const studyData = caseStudyContent[slug];

  const frontmatter: ProjectCaseStudyFrontmatter = {
    title: project.title,
    description: project.description,
    image: project.image,
    technologies: project.technologies.map((t) => t.name),
    github: project.github ?? '',
    live: project.live ?? '',
    timeline: studyData?.timeline ?? '',
    role: 'Lead Developer',
    status: project.isWorking ? 'in-progress' : 'completed',
    isPublished: true,
    featured: true,
    challenges: studyData?.challenges,
    learnings: studyData?.learnings,
  };

  return {
    slug,
    frontmatter,
    content: studyData?.content ?? 'Case study details coming soon.',
  };
}

/**
 * Get all project case studies with frontmatter only (for listing)
 */
export function getAllProjectCaseStudies(): ProjectCaseStudyPreview[] {
  const slugs = getProjectCaseStudySlugs();

  const caseStudies = slugs
    .map((slug) => {
      const caseStudy = getProjectCaseStudyBySlug(slug);
      if (!caseStudy) return null;

      return {
        slug: caseStudy.slug,
        frontmatter: caseStudy.frontmatter,
      };
    })
    .filter(
      (caseStudy): caseStudy is ProjectCaseStudyPreview => caseStudy !== null,
    )
    .sort((a, b) => {
      // Sort by featured first, then by title
      if (a.frontmatter.featured && !b.frontmatter.featured) return -1;
      if (!a.frontmatter.featured && b.frontmatter.featured) return 1;
      return a.frontmatter.title.localeCompare(b.frontmatter.title);
    });

  return caseStudies;
}

/**
 * Get all published project case studies
 */
export function getPublishedProjectCaseStudies(): ProjectCaseStudyPreview[] {
  const allCaseStudies = getAllProjectCaseStudies();
  return allCaseStudies.filter(
    (caseStudy) => caseStudy.frontmatter.isPublished,
  );
}

/**
 * Get project case studies by technology
 */
export function getProjectCaseStudiesByTechnology(
  technology: string,
): ProjectCaseStudyPreview[] {
  const publishedCaseStudies = getPublishedProjectCaseStudies();
  return publishedCaseStudies.filter((caseStudy) =>
    caseStudy.frontmatter.technologies.some(
      (tech) => tech.toLowerCase() === technology.toLowerCase(),
    ),
  );
}

/**
 * Get all unique technologies from published case studies
 */
export function getAllTechnologies(): string[] {
  const publishedCaseStudies = getPublishedProjectCaseStudies();
  const technologiesSet = new Set<string>();

  publishedCaseStudies.forEach((caseStudy) => {
    caseStudy.frontmatter.technologies.forEach((tech) => {
      technologiesSet.add(tech.toLowerCase());
    });
  });

  return Array.from(technologiesSet).sort();
}

/**
 * Get project navigation (next/previous) based on config Projects order
 */
export function getProjectNavigation(currentSlug: string): {
  previous: { title: string; slug: string } | null;
  next: { title: string; slug: string } | null;
} {
  // Find current project in config
  const currentProjectIndex = projects.findIndex(
    (project) => project.projectDetailsPageSlug === `/projects/${currentSlug}`,
  );

  if (currentProjectIndex === -1) {
    return { previous: null, next: null };
  }

  const previousProject =
    currentProjectIndex > 0 ? projects[currentProjectIndex - 1] : null;
  const nextProject =
    currentProjectIndex < projects.length - 1
      ? projects[currentProjectIndex + 1]
      : null;

  return {
    previous: previousProject
      ? {
          title: previousProject.title,
          slug: previousProject.projectDetailsPageSlug.replace(
            '/projects/',
            '',
          ),
        }
      : null,
    next: nextProject
      ? {
          title: nextProject.title,
          slug: nextProject.projectDetailsPageSlug.replace('/projects/', ''),
        }
      : null,
  };
}

/**
 * Get related project case studies based on technologies (excluding the current one)
 */
export function getRelatedProjectCaseStudies(
  currentSlug: string,
  maxProjects = 2,
): ProjectCaseStudyPreview[] {
  const currentCaseStudy = getProjectCaseStudyBySlug(currentSlug);
  if (!currentCaseStudy || !currentCaseStudy.frontmatter.isPublished) {
    return [];
  }

  const allCaseStudies = getPublishedProjectCaseStudies();
  const currentTechnologies = currentCaseStudy.frontmatter.technologies.map(
    (tech) => tech.toLowerCase(),
  );

  // Calculate relevance score based on shared technologies
  const caseStudiesWithScore = allCaseStudies
    .filter((caseStudy) => caseStudy.slug !== currentSlug)
    .map((caseStudy) => {
      const sharedTechnologies = caseStudy.frontmatter.technologies.filter(
        (tech) => currentTechnologies.includes(tech.toLowerCase()),
      );
      return {
        caseStudy,
        score: sharedTechnologies.length,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return caseStudiesWithScore
    .slice(0, maxProjects)
    .map((item) => item.caseStudy);
}
