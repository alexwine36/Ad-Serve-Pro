import { CampaignUpdateInput } from '@repo/common-types';
import type { z } from 'zod';

export const CampaignUpdateSchema = CampaignUpdateInput;

export type CampaignUpdateSchema = z.infer<typeof CampaignUpdateSchema>;
