import { AdPlacementCampaignAdUpdateInput } from '@repo/common-types';
import type { z } from 'zod';

export const AdPlacementCampaignAdUpdateSchema =
  AdPlacementCampaignAdUpdateInput;

export type AdPlacementCampaignAdUpdateSchema = z.infer<
  typeof AdPlacementCampaignAdUpdateSchema
>;
