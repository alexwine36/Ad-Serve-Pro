import { Prisma } from '@repo/database';
import type { PageAnalyticsData } from '../../page-analytics';

export const pageAnalyticsSelectFields =
  Prisma.validator<Prisma.PageAnalyticsDefaultArgs>()({
    include: {},
  });

type PageAnalyticsWithData = Prisma.PageAnalyticsGetPayload<
  typeof pageAnalyticsSelectFields
>;

export const formatPageAnalyticsData = (
  pageAnalytics: PageAnalyticsWithData
): PageAnalyticsData => {
  return {
    ...pageAnalytics,
  };
};
