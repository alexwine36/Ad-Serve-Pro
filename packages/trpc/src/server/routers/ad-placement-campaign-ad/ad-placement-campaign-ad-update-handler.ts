import {
  adPlacementCampaignAdSelectFields,
  formatAdPlacementCampaignAdData,
} from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { AdPlacementCampaignAdUpdateSchema } from './ad-placement-campaign-ad-update-schema';

type AdPlacementCampaignAdUpdateOptions = {
  ctx: TRPCContextInnerWithSession;
  input: AdPlacementCampaignAdUpdateSchema;
};

export const adPlacementCampaignAdUpdateHandler = async ({
  ctx,
  input,
}: AdPlacementCampaignAdUpdateOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.adPlacementCampaignAd.update({
    where: {
      id: input.id,
    },
    data: { ...input },
    ...adPlacementCampaignAdSelectFields,
  });
  return formatAdPlacementCampaignAdData(res);
};

export type AdPlacementCampaignAdUpdateResponse = Awaited<
  ReturnType<typeof adPlacementCampaignAdUpdateHandler>
>;
