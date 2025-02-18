import { z } from 'zod';
import { AdPlacementData } from './ad-placement';
import { CampaignAdData } from './campaign-ad';
import { AdPlacementCampaignAdSchema } from './generated';

export const AdPlacementCampaignAdData = AdPlacementCampaignAdSchema.extend({
  // Update base types here
  adPlacement: AdPlacementData,
  campaignAd: CampaignAdData,
  company: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export type AdPlacementCampaignAdData = z.infer<
  typeof AdPlacementCampaignAdData
>;

export const AdPlacementCampaignAdUpdateInput = AdPlacementCampaignAdData.omit({
  createdAt: true,
  updatedAt: true,
  adPlacement: true,
  campaignAd: true,
  // organizationId: true,
});

export type AdPlacementCampaignAdUpdateInput = z.infer<
  typeof AdPlacementCampaignAdUpdateInput
>;

export const AdPlacementCampaignAdInput =
  AdPlacementCampaignAdUpdateInput.partial({
    id: true,
  });
export type AdPlacementCampaignAdInput = z.infer<
  typeof AdPlacementCampaignAdInput
>;
