import achievementsConfig from '@/config/Achievements';
import { footerConfig } from '@/config/Footer';
import { heroConfig, socialLinks } from '@/config/Hero';
import { projects } from '@/config/Projects';
import { describe, expect, it } from 'vitest';

describe('Data Validation', () => {
  describe('Projects Config', () => {
    it('should have a title and projectDetailsPageSlug for every project', () => {
      projects.forEach((project) => {
        expect(project.title).toBeDefined();
        expect(project.projectDetailsPageSlug).toBeDefined();
        expect(typeof project.projectDetailsPageSlug).toBe('string');
      });
    });

    it('should have unique projectDetailsPageSlugs', () => {
      const slugs = projects.map((p) => p.projectDetailsPageSlug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });
  });

  describe('Hero Config', () => {
    it('should have required fields', () => {
      expect(heroConfig.name).toBeDefined();
      expect(heroConfig.title).toBeDefined();
      expect(Array.isArray(heroConfig.skills)).toBe(true);
      expect(heroConfig.description.template).toBeDefined();
    });

    it('should have valid template indices for skills', () => {
      const template = heroConfig.description.template;
      const indices = Array.from(template.matchAll(/\{skills:(\d+)\}/g)).map(
        (m) => parseInt(m[1]),
      );
      indices.forEach((index) => {
        expect(heroConfig.skills[index]).toBeDefined();
      });
    });
  });

  describe('Social Links', () => {
    it('should have valid hrefs', () => {
      socialLinks.forEach((link) => {
        expect(
          link.href.startsWith('http') || link.href.startsWith('mailto'),
        ).toBe(true);
      });
    });
  });

  describe('Achievements Config', () => {
    it('should have certificates with valid files', () => {
      achievementsConfig.certificates.forEach((cert) => {
        expect(cert.title).toBeDefined();
        expect(cert.file).toBeDefined();
      });
    });
  });
});
