import { faker } from '@faker-js/faker';
import type { Campaign, PrismaClient } from '@repo/database';

export const seedCampaignAds = async (
  campaigns: Campaign[],
  prisma: PrismaClient
) => {
  // const camps = campaigns.filter((campaign) => campaign.status === 'ACTIVE');
  return Promise.all(
    campaigns.map((campaign) => seedCampaignAd(campaign, prisma))
  );
};

const seedCampaignAd = async (campaign: Campaign, prisma: PrismaClient) => {
  // const campaignAds = await prisma.campaignAd.count({
  //   where: {
  //     campaignId: campaign.id,
  //   },
  // });
  // if (campaignAds > 2) {
  //   return campaignAds;
  // }

  const ads = await prisma.advertisement.findMany({
    where: {
      companyId: campaign.companyId,
      organizationId: campaign.organizationId,
      // isActive: true,
    },
  });
  if (!ads.length) {
    return [];
  }
  const campaignAds = await prisma.campaignAd.createMany({
    data: ads.map((ad) => ({
      campaignId: campaign.id,
      organizationId: campaign.organizationId,
      companyId: campaign.companyId,
      adId: ad.id,
      isActive:
        campaign.status === 'ACTIVE' ||
        faker.helpers.arrayElement([true, false]),
    })),
    skipDuplicates: true,
  });

  return campaignAds;
};
