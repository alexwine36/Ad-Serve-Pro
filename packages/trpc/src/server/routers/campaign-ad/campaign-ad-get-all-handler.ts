import {
  campaignAdSelectFields,
  formatCampaignAdData,
} from '@repo/common-types';
import type { Prisma } from '@repo/database';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
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

  let campaignAdData: Prisma.CampaignAdCreateManyInput[] = [];

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
    campaignAdData = campaigns.map((campaign) => ({
      companyId: campaign.companyId,
      organizationId: campaign.organizationId,
      adId: ad.id,
      campaignId: campaign.id,
      isActive: false,
      weight: 1,
    }));
    // console.log(campaigns);
  }

  if (input.source === 'CAMPAIGN') {
    const campaign = await prisma.campaign.findFirst({
      where: {
        id: input.campaignId,
      },
    });
    if (!campaign) {
      throw new Error('Campaign not found');
    }
    const advertisements = await prisma.advertisement.findMany({
      where: {
        companyId: campaign.companyId,
        campaigns: {
          none: {
            campaignId: campaign.id,
          },
        },
      },
    });
    campaignAdData = advertisements.map((ad) => ({
      adId: ad.id,
      companyId: ad.companyId,
      organizationId: ad.organizationId,
      campaignId: campaign.id,
      isActive: false,
      weight: 1,
    }));
  }

  if (campaignAdData.length > 0) {
    console.log('TO BE ADDED', campaignAdData.length);
    await prisma.campaignAd.createMany({
      data: campaignAdData,
      skipDuplicates: true,
    });
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
    ...campaignAdSelectFields,
  });
  return res.map(formatCampaignAdData);
};

export type CampaignAdGetAllResponse = Awaited<
  ReturnType<typeof campaignAdGetAllHandler>
>;
