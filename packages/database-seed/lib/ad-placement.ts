import { faker } from '@faker-js/faker';
import type { Organization, PrismaClient } from '@repo/database';
import { sumBy } from 'remeda';

const getAdPlacements = async (orgId: string, prisma: PrismaClient) => {
  const resp = await prisma.adPlacement.findMany({
    where: {
      organizationId: orgId,
    },
    include: {
      _count: {
        select: {
          campaignAds: true,
        },
      },
    },
  });
  return {
    ads: resp,
    campaignAdsCount: sumBy(resp, (ad) => ad._count.campaignAds),
  };
};
type AdPlacements = Awaited<ReturnType<typeof getAdPlacements>>;

export const seedAdPlacements = async (
  org: Organization,
  prisma: PrismaClient
) => {
  let adPlacements = await getAdPlacements(org.id, prisma);
  if (!adPlacements.ads.length) {
    await createOrgAdPlacement(org.id, prisma);
    adPlacements = await getAdPlacements(org.id, prisma);
  }
  if (!adPlacements.campaignAdsCount) {
    await Promise.all(
      adPlacements.ads.map((ad) => connectAdPlacements(ad, prisma))
    );
    adPlacements = await getAdPlacements(org.id, prisma);
  }
  return adPlacements;
};

const connectAdPlacements = async (
  adPlacement: AdPlacements['ads'][0],
  prisma: PrismaClient
) => {
  const campaignAds = await prisma.campaignAd.findMany({
    where: {
      organizationId: adPlacement.organizationId,
      adPlacementCampaignAds: {
        none: {
          adPlacementId: adPlacement.id,
        },
      },
    },
  });
  if (!campaignAds.length) {
    return adPlacement;
  }
  await prisma.adPlacementCampaignAd.createMany({
    data: faker.helpers.arrayElements(campaignAds, 3).map((campaignAd) => {
      return {
        adPlacementId: adPlacement.id,
        campaignAdId: campaignAd.id,
        isActive: true,
      };
    }),
  });
};

const createOrgAdPlacement = async (orgId: string, prisma: PrismaClient) => {
  const adPlacement = await prisma.adPlacement.create({
    data: {
      organizationId: orgId,
      name: 'Default Ad Placement',
      description: 'Default Ad Placement for the organization',
    },
  });
  return adPlacement;
};
