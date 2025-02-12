import {
  campaignAdSelectFields,
  formatCampaignAdData,
} from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { CampaignAdUpdateSchema } from './campaign-ad-update-schema';

type CampaignAdUpdateOptions = {
  ctx: TRPCContextInnerWithSession;
  input: CampaignAdUpdateSchema;
};

export const campaignAdUpdateHandler = async ({
  ctx,
  input,
}: CampaignAdUpdateOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.campaignAd.update({
    where: {
      id: input.id,
    },
    data: { ...input },
    ...campaignAdSelectFields,
  });
  return formatCampaignAdData(res);
};

export type CampaignAdUpdateResponse = Awaited<
  ReturnType<typeof campaignAdUpdateHandler>
>;
