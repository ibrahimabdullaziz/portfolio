import * as projectLib from '@/lib/project';
import { describe, expect, it, vi } from 'vitest';

// Mock the projects config to decouple tests from actual data
vi.mock('@/config/Projects', () => ({
  projects: [
    {
      title: 'Project A',
      description: 'Desc A',
      image: '/imgA.png',
      technologies: [{ name: 'React' }, { name: 'TypeScript' }],
      github: 'ghA',
      live: 'liveA',
      projectDetailsPageSlug: '/projects/project-a',
      isWorking: false,
    },
    {
      title: 'Project B',
      description: 'Desc B',
      image: '/imgB.png',
      technologies: [
        { name: 'Next.js' },
        { name: 'Tailwind' },
        { name: 'React' },
      ],
      github: 'ghB',
      live: 'liveB',
      projectDetailsPageSlug: '/projects/project-b',
      isWorking: true,
    },
  ],
}));

describe('lib/project', () => {
  describe('getProjectCaseStudySlugs', () => {
    it('returns slugs without the prefix', () => {
      const slugs = projectLib.getProjectCaseStudySlugs();
      expect(slugs).toEqual(['project-a', 'project-b']);
    });
  });

  describe('getProjectCaseStudyBySlug', () => {
    it('returns correct case study for a valid slug', () => {
      const caseStudy = projectLib.getProjectCaseStudyBySlug('project-a');
      expect(caseStudy).not.toBeNull();
      expect(caseStudy?.frontmatter.title).toBe('Project A');
      expect(caseStudy?.frontmatter.status).toBe('completed');
    });

    it('returns null for an invalid slug', () => {
      const caseStudy = projectLib.getProjectCaseStudyBySlug('invalid');
      expect(caseStudy).toBeNull();
    });
  });

  describe('getAllTechnologies', () => {
    it('returns unique sorted technologies', () => {
      const techs = projectLib.getAllTechnologies();
      // react is shared, so unique list is react, typescript, next.js, tailwind
      expect(techs).toEqual(['next.js', 'react', 'tailwind', 'typescript']);
    });
  });

  describe('getProjectNavigation', () => {
    it('returns correct next/previous titles and slugs', () => {
      const nav = projectLib.getProjectNavigation('project-a');
      expect(nav.previous).toBeNull();
      expect(nav.next?.title).toBe('Project B');
      expect(nav.next?.slug).toBe('project-b');
    });
  });

  describe('getRelatedProjectCaseStudies', () => {
    it('finds projects with shared technologies', () => {
      const related = projectLib.getRelatedProjectCaseStudies('project-a');
      expect(related).toHaveLength(1);
      expect(related[0].frontmatter.title).toBe('Project B'); // Both have React
    });
  });
});
