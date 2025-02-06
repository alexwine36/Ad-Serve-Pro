import { z } from 'zod';

export const AdServerGetAdsSchema = z.object({
  // Define your schema here
  organizationId: z.string(),
});

export type AdServerGetAdsSchema = z.infer<typeof AdServerGetAdsSchema>;
