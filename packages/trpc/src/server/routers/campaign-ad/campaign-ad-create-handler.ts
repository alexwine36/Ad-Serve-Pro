import { CampaignAdData } from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { CampaignAdCreateSchema } from './campaign-ad-create-schema';

type CampaignAdCreateOptions = {
  ctx: TRPCContextInnerWithSession;
  input: CampaignAdCreateSchema;
};

export const campaignAdCreateHandler = async ({
  ctx,
  input,
}: CampaignAdCreateOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.campaignAd.create({
    data: { ...input },
  });
  return CampaignAdData.parse(res);
};

export type CampaignAdCreateResponse = Awaited<
  ReturnType<typeof campaignAdCreateHandler>
>;
