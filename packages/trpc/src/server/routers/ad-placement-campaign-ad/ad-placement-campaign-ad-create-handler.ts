import {
  adPlacementCampaignAdSelectFields,
  formatAdPlacementCampaignAdData,
} from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { AdPlacementCampaignAdCreateSchema } from './ad-placement-campaign-ad-create-schema';

type AdPlacementCampaignAdCreateOptions = {
  ctx: TRPCContextInnerWithSession;
  input: AdPlacementCampaignAdCreateSchema;
};

export const adPlacementCampaignAdCreateHandler = async ({
  ctx,
  input,
}: AdPlacementCampaignAdCreateOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.adPlacementCampaignAd.create({
    data: { ...input },
    ...adPlacementCampaignAdSelectFields,
  });
  return formatAdPlacementCampaignAdData(res);
};

export type AdPlacementCampaignAdCreateResponse = Awaited<
  ReturnType<typeof adPlacementCampaignAdCreateHandler>
>;
