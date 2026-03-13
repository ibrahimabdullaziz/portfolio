'use client';

import { githubConfig } from '@/config/Github';
import { useEffect, useState } from 'react';

export type ContributionItem = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type GitHubContributionResponse = {
  date: string;
  contributionCount: number;
  contributionLevel:
    | 'NONE'
    | 'FIRST_QUARTILE'
    | 'SECOND_QUARTILE'
    | 'THIRD_QUARTILE'
    | 'FOURTH_QUARTILE';
};

function filterCurrentYear(
  contributions: ContributionItem[],
): ContributionItem[] {
  const currentYear = new Date().getFullYear();
  const janFirst = new Date(currentYear, 0, 1);
  const decThirtyFirst = new Date(currentYear, 11, 31);

  const contributionMap = new Map(
    contributions.map((item) => [item.date, item]),
  );

  const fullYearContributions: ContributionItem[] = [];
  const currentDate = new Date(janFirst);

  while (currentDate <= decThirtyFirst) {
    const dateString = currentDate.toISOString().split('T')[0];
    const existingContribution = contributionMap.get(dateString);

    if (existingContribution) {
      fullYearContributions.push(existingContribution);
    } else {
      fullYearContributions.push({
        date: dateString,
        count: 0,
        level: 0,
      });
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return fullYearContributions;
}

export function useGithubContributions() {
  const [contributions, setContributions] = useState<ContributionItem[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(
          `${githubConfig.apiUrl}/${githubConfig.username}.json`,
          { signal: controller.signal },
        );

        clearTimeout(timeoutId);

        const data: { contributions?: unknown[] } = await response.json();

        if (data?.contributions && Array.isArray(data.contributions)) {
          const flattenedContributions = data.contributions.flat();
          const contributionLevelMap = {
            NONE: 0,
            FIRST_QUARTILE: 1,
            SECOND_QUARTILE: 2,
            THIRD_QUARTILE: 3,
            FOURTH_QUARTILE: 4,
          };

          const validContributions = flattenedContributions
            .filter(
              (item: unknown): item is GitHubContributionResponse =>
                typeof item === 'object' &&
                item !== null &&
                'date' in item &&
                'contributionCount' in item &&
                'contributionLevel' in item,
            )
            .map((item: GitHubContributionResponse) => ({
              date: String(item.date),
              count: Number(item.contributionCount || 0),
              level: (contributionLevelMap[
                item.contributionLevel as keyof typeof contributionLevelMap
              ] || 0) as ContributionItem['level'],
            }));

          if (validContributions.length > 0) {
            const total = validContributions.reduce(
              (sum, item) => sum + item.count,
              0,
            );
            setTotalContributions(total);
            setContributions(filterCurrentYear(validContributions));
          } else {
            setHasError(true);
          }
        } else {
          setHasError(true);
        }
      } catch (err) {
        console.error('Failed to fetch GitHub contributions:', err);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { contributions, totalContributions, isLoading, hasError };
}
