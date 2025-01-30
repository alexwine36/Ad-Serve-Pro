import { CampaignInput } from '@repo/common-types';
import type { z } from 'zod';

export const CampaignCreateSchema = CampaignInput;

export type CampaignCreateSchema = z.infer<typeof CampaignCreateSchema>;
