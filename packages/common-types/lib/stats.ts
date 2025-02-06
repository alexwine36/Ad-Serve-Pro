import { z } from 'zod';

export const StatsInput = z.object({
  companyId: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  includeAll: z.boolean().optional(),
});
export type StatsInput = z.infer<typeof StatsInput>;

export const StatsCompareInput = StatsInput.extend({
  days: z.number().default(30),
}).omit({
  startDate: true,
  endDate: true,
});

export type StatsCompareInput = z.infer<typeof StatsCompareInput>;
