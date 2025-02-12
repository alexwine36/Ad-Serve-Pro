import type { z } from 'zod';
import { AdvertisementData } from './advertisement';
import { CampaignData } from './campaign';
import { CampaignAdSchema } from './generated';

export const CampaignAdData = CampaignAdSchema.extend({
  // Update base types here
  campaign: CampaignData,
  ad: AdvertisementData,
});

export type CampaignAdData = z.infer<typeof CampaignAdData>;

export const CampaignAdUpdateInput = CampaignAdData.omit({
  createdAt: true,
  campaign: true,
  ad: true,
  // updatedAt: true,
  // organizationId: true,
});

export type CampaignAdUpdateInput = z.infer<typeof CampaignAdUpdateInput>;

export const CampaignAdInput = CampaignAdUpdateInput.partial({
  id: true,
});
export type CampaignAdInput = z.infer<typeof CampaignAdInput>;
