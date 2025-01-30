import { z } from 'zod';

export const CampaignGetOneSchema = z.object({
  // Define your schema here
  id: z.string(),
});

export type CampaignGetOneSchema = z.infer<typeof CampaignGetOneSchema>;
