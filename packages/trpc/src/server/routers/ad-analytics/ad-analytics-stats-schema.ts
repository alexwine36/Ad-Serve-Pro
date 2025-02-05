import { AnalyticsType } from '@repo/common-types';
import { z } from 'zod';
import { AdAnalyticsGetAllSchema } from './ad-analytics-get-all-schema';

export const AdAnalyticsStatsSchema = AdAnalyticsGetAllSchema.extend({
  // Define your schema here

  type: AnalyticsType.optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export type AdAnalyticsStatsSchema = z.infer<typeof AdAnalyticsStatsSchema>;
