import { CampaignData } from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { CampaignCreateSchema } from './campaign-create-schema';

type CampaignCreateOptions = {
  ctx: TRPCContextInnerWithSession;
  input: CampaignCreateSchema;
};

export const campaignCreateHandler = async ({
  ctx,
  input,
}: CampaignCreateOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.campaign.create({
    data: { ...input },
  });
  return CampaignData.parse(res);
};

export type CampaignCreateResponse = Awaited<
  ReturnType<typeof campaignCreateHandler>
>;
