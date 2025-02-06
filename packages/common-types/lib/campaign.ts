import { add } from 'date-fns';
import { z } from 'zod';
import { CampaignSchema, CampaignStatusSchema } from './generated';
import { getStartOfDate } from './utils/get-normalized-date';

export const CampaignStatus = CampaignStatusSchema;
export type CampaignStatus = z.infer<typeof CampaignStatus>;

export const CampaignTargeting = z.object({
  pathIncludes: z.string().optional(),
});

export const CampaignData = CampaignSchema.extend({
  // Update base types here
  targeting: CampaignTargeting.optional().default({}),
  budget: z.coerce.number().default(0),
  name: z.string().min(2).default(''),
  startDate: z.date().default(() => getStartOfDate(new Date())),
  endDate: z
    .date()
    .default(() => add(getStartOfDate(new Date()), { months: 1 })),
  status: CampaignStatus.default('DRAFT'),
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
});
// .default({
//   // Define default values here
//   name: '',
//   startDate: getStartOfDate(new Date()),
//   endDate: add(getStartOfDate(new Date()), { months: 1 }),
//   status: 'DRAFT',
//   companyId: '',
//   targeting: {},
//   budget: 0,
// });
export type CampaignInput = z.infer<typeof CampaignInput>;
