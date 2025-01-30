import { z } from 'zod';
import { CampaignSchema } from './generated';

export const CampaignTargeting = z.object({

  pathIncludes: z.string().optional(),
})

export const CampaignData = CampaignSchema.extend({
  // Update base types here
  targeting: CampaignTargeting.optional().default({}),
});

export type CampaignData = z.infer<typeof CampaignData>;

export const CampaignUpdateInput = CampaignData.omit({
  createdAt: true,
  updatedAt: true,
  // organizationId: true,
});

export type CampaignUpdateInput = z.infer<typeof CampaignUpdateInput>;

export const CampaignInput = CampaignUpdateInput.partial({
  id: true
});
export type CampaignInput = z.infer<typeof CampaignInput>;
