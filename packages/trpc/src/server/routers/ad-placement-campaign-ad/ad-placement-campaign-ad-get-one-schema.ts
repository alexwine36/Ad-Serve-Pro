import { z } from 'zod';

export const AdPlacementCampaignAdGetOneSchema = z.object({
  // Define your schema here
  id: z.string(),
});

export type AdPlacementCampaignAdGetOneSchema = z.infer<
  typeof AdPlacementCampaignAdGetOneSchema
>;
