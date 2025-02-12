import { CampaignAdData } from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import { z } from 'zod';
import type { CampaignAdGetAllSchema } from './campaign-ad-get-all-schema';

type CampaignAdGetAllOptions = {
  ctx: TRPCContextInnerWithSession;
  input: CampaignAdGetAllSchema;
};

export const campaignAdGetAllHandler = async ({
  ctx,
  input,
}: CampaignAdGetAllOptions) => {
  const { prisma, session } = ctx;

  if (input.source === 'ADVERTISEMENT') {
    const ad = await prisma.advertisement.findFirst({
      where: {
        id: input.advertisementId,
      },
    });
    if (!ad) {
      throw new Error('Ad not found');
    }
    const campaigns = await prisma.campaign.findMany({
      where: {
        companyId: ad.companyId,
        ads: {
          none: {
            adId: ad.id,
          },
        },
      },
    });
    const _createCampaignAds = await prisma.campaignAd.createMany({
      data: campaigns.map((campaign) => ({
        adId: ad.id,
        campaignId: campaign.id,
        isActive: false,
        weight: 1,
      })),
      skipDuplicates: true,
    });
    // console.log(campaigns);
  }

  const res = await prisma.campaignAd.findMany({
    where: {
      campaign: {
        id: input.campaignId,
      },
      ad: {
        id: input.advertisementId,
      },
    },
    include: {
      ad: true,
      campaign: true,
    },
  });
  return z.array(CampaignAdData).parse(res);
};

export type CampaignAdGetAllResponse = Awaited<
  ReturnType<typeof campaignAdGetAllHandler>
>;
