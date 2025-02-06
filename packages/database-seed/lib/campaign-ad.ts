import { faker } from '@faker-js/faker';
import type { Campaign, PrismaClient } from '@repo/database';

export const seedCampaignAds = async (
  campaigns: Campaign[],
  prisma: PrismaClient
) => {
  const camps = campaigns.filter((campaign) => campaign.status === 'ACTIVE');
  return Promise.all(camps.map((campaign) => seedCampaignAd(campaign, prisma)));
};

const seedCampaignAd = async (campaign: Campaign, prisma: PrismaClient) => {
  const campaignAds = await prisma.campaignAd.count({
    where: {
      campaignId: campaign.id,
    },
  });
  if (campaignAds > 2) {
    return campaignAds;
  }
  const ads = await prisma.advertisement.findMany({
    where: {
      companyId: campaign.companyId,
      isActive: true,
    },
  });
  if (!ads.length) {
    return [];
  }
  const campaignAd = await prisma.campaignAd.create({
    data: {
      campaignId: campaign.id,
      adId: faker.helpers.arrayElement(ads).id,
    },
  });
  return campaignAd;
};
