import {
  adPlacementCampaignAdSelectFields,
  formatAdPlacementCampaignAdData,
} from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import { TRPCError } from '@trpc/server';
import type { AdPlacementCampaignAdGetOneSchema } from './ad-placement-campaign-ad-get-one-schema';

type AdPlacementCampaignAdGetOneOptions = {
  ctx: TRPCContextInnerWithSession;
  input: AdPlacementCampaignAdGetOneSchema;
};

export const adPlacementCampaignAdGetOneHandler = async ({
  ctx,
  input,
}: AdPlacementCampaignAdGetOneOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.adPlacementCampaignAd.findFirst({
    where: {
      id: input.id,
    },
    ...adPlacementCampaignAdSelectFields,
  });
  if (!res) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Ad placement campaign ad not found',
    });
  }
  return formatAdPlacementCampaignAdData(res);
};

export type AdPlacementCampaignAdGetOneResponse = Awaited<
  ReturnType<typeof adPlacementCampaignAdGetOneHandler>
>;
