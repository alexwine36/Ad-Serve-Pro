import { AdPlacementCampaignAdInput } from '@repo/common-types';
import type { z } from 'zod';

export const AdPlacementCampaignAdCreateSchema = AdPlacementCampaignAdInput;

export type AdPlacementCampaignAdCreateSchema = z.infer<
  typeof AdPlacementCampaignAdCreateSchema
>;
