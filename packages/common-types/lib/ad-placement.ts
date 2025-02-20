import type { z } from 'zod';
import { CampaignStatusCounts } from './campaign';
import { AdPlacementSchema } from './generated';

export const AdPlacementData = AdPlacementSchema.extend({
  // Update base types here
  campaignStats: CampaignStatusCounts,
});

export type AdPlacementData = z.infer<typeof AdPlacementData>;

export const AdPlacementUpdateInput = AdPlacementData.omit({
  createdAt: true,
  updatedAt: true,
  organizationId: true,
  campaignStats: true,
});

export type AdPlacementUpdateInput = z.infer<typeof AdPlacementUpdateInput>;

export const AdPlacementInput = AdPlacementUpdateInput.partial({
  id: true,
});
export type AdPlacementInput = z.infer<typeof AdPlacementInput>;
