import { add } from 'date-fns';
import { z } from 'zod';
import { CampaignSchema, CampaignStatusSchema } from './generated';
import { getStartOfDate } from './utils/get-normalized-date';

export const CampaignStatus = CampaignStatusSchema;
export type CampaignStatus = z.infer<typeof CampaignStatus>;

export const CampaignStatusCounts = z
  .record(CampaignStatus, z.number())
  .default({
    DRAFT: 0,
    SCHEDULED: 0,
    ACTIVE: 0,
    COMPLETED: 0,
    PAUSED: 0,
    CANCELLED: 0,
  });
export type CampaignStatusCounts = z.infer<typeof CampaignStatusCounts>;

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
const removedInputs = CampaignStatus.exclude([
  'ACTIVE',
  'SCHEDULED',
  'COMPLETED',
]).options;
export const CampaignStatusInput = z.enum(['READY', ...removedInputs]);

export type CampaignStatusInput = z.infer<typeof CampaignStatusInput>;

export const campaignStatusToCampaignStatusInput = (
  status: CampaignStatus
): CampaignStatusInput => {
  // biome-ignore lint/style/useDefaultSwitchClause: Keeping for better notifications about missing cases
  switch (status) {
    case 'DRAFT':
      return 'DRAFT';
    case 'SCHEDULED':
      return 'READY';
    case 'ACTIVE':
      return 'READY';
    case 'COMPLETED':
      return 'READY';
    case 'PAUSED':
      return 'PAUSED';
    case 'CANCELLED':
      return 'CANCELLED';
  }
};

export type FormatCampaignPickedTypes = Pick<
  CampaignInput,
  'startDate' | 'endDate' | 'status'
>;

export const formatCampaignInput = <T extends FormatCampaignPickedTypes>(
  input: T
): T & {
  status: CampaignStatus;
} => {
  let status: CampaignStatus = CampaignStatus.enum.DRAFT;
  if (input.status === 'READY') {
    if (input.startDate && input.endDate) {
      if (
        new Date(input.startDate) < new Date() &&
        new Date(input.endDate) > new Date()
      ) {
        status = CampaignStatus.enum.ACTIVE;
      } else if (new Date(input.startDate) > new Date()) {
        status = CampaignStatus.enum.SCHEDULED;
      } else {
        status = CampaignStatus.enum.COMPLETED;
      }
    }
  } else {
    status = input.status;
  }
  return {
    ...input,
    status,
  };
};

export const CampaignUpdateInput = CampaignData.omit({
  createdAt: true,
  updatedAt: true,
  status: true,
  // organizationId: true,
}).extend({
  status: CampaignStatusInput.default('DRAFT'),
});

export type CampaignUpdateInput = z.infer<typeof CampaignUpdateInput>;

export const CampaignInput = CampaignUpdateInput.partial({
  id: true,
});

export type CampaignInput = z.infer<typeof CampaignInput>;
