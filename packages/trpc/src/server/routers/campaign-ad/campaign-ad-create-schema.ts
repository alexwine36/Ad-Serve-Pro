import { CampaignAdInput } from '@repo/common-types';
import type { z } from 'zod';

export const CampaignAdCreateSchema = CampaignAdInput;

export type CampaignAdCreateSchema = z.infer<typeof CampaignAdCreateSchema>;
