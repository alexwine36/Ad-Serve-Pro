import { CampaignData } from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { CampaignUpdateSchema } from './campaign-update-schema';

type CampaignUpdateOptions = {
  ctx: TRPCContextInnerWithSession;
  input: CampaignUpdateSchema;
};

export const campaignUpdateHandler = async ({
  ctx,
  input,
}: CampaignUpdateOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.campaign.update({
    where: {
      id: input.id,
    },
    data: { ...input },
  });
  return CampaignData.parse(res);
};

export type CampaignUpdateResponse = Awaited<
  ReturnType<typeof campaignUpdateHandler>
>;
