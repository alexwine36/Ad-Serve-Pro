import { Prisma } from '@repo/database';
import type { AdPlacementData } from '../../ad-placement';
import type { CampaignStatusCounts } from '../../campaign';

export const adPlacementSelectFields =
  Prisma.validator<Prisma.AdPlacementDefaultArgs>()({
    include: {
      campaignAds: {
        include: {
          campaignAd: {
            include: {
              campaign: true,
            },
          },
        },
      },
    },
  });

type AdPlacementWithData = Prisma.AdPlacementGetPayload<
  typeof adPlacementSelectFields
>;

export const formatAdPlacementData = (
  adPlacement: AdPlacementWithData
): AdPlacementData => {
  const { campaignAds, ...rest } = adPlacement;
  const campaignStats = campaignAds.reduce<Required<CampaignStatusCounts>>(
    (acc, curr) => {
      if (curr.campaignAd.campaign.status) {
        acc[curr.campaignAd.campaign.status] =
          acc[curr.campaignAd.campaign.status] + 1 || 1;
      }
      return acc;
    },
    {
      DRAFT: 0,
      SCHEDULED: 0,
      ACTIVE: 0,
      COMPLETED: 0,
      PAUSED: 0,
      CANCELLED: 0,
    }
  );
  return {
    ...rest,
    campaignStats,
  };
};
