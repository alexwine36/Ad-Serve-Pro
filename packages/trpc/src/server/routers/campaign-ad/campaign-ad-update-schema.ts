import { CampaignAdUpdateInput } from '@repo/common-types';
import type { z } from 'zod';

export const CampaignAdUpdateSchema = CampaignAdUpdateInput;

export type CampaignAdUpdateSchema = z.infer<typeof CampaignAdUpdateSchema>;
