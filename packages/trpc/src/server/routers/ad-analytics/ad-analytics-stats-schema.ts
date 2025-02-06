import { AnalyticsType } from '@repo/common-types';
import { z } from 'zod';
import { AdAnalyticsGetAllSchema } from './ad-analytics-get-all-schema';

export const AdAnalyticsStatsSchema = AdAnalyticsGetAllSchema.extend({
  type: AnalyticsType.optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  includeAll: z.boolean().optional(),
});

export type AdAnalyticsStatsSchema = z.infer<typeof AdAnalyticsStatsSchema>;
