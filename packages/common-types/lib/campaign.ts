import { add } from 'date-fns';
import { z } from 'zod';
import { CampaignSchema } from './generated';
import { getStartOfDate } from './utils/get-normalized-date';
export const CampaignTargeting = z.object({
  pathIncludes: z.string().optional(),
});

export const CampaignData = CampaignSchema.extend({
  // Update base types here
  targeting: CampaignTargeting.optional().default({}),
  budget: z.coerce.number().default(0),
});

export type CampaignData = z.infer<typeof CampaignData>;

export const CampaignUpdateInput = CampaignData.omit({
  createdAt: true,
  updatedAt: true,
  // organizationId: true,
});

export type CampaignUpdateInput = z.infer<typeof CampaignUpdateInput>;

export const CampaignInput = CampaignUpdateInput.partial({
  id: true,
}).default({
  // Define default values here
  name: '',
  startDate: getStartOfDate(new Date()),
  endDate: add(getStartOfDate(new Date()), { months: 1 }),
  status: 'DRAFT',
  companyId: '',
  targeting: {},
  budget: 0,
});
export type CampaignInput = z.infer<typeof CampaignInput>;
