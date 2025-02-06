import { z } from 'zod';

export const AdAnalyticsGetAllSchema = z.object({
  // Define your schema here
  //   organizationId: z.string().optional(),
  companyId: z.string().optional(),
});

export type AdAnalyticsGetAllSchema = z.infer<typeof AdAnalyticsGetAllSchema>;
