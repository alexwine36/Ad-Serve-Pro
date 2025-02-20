import { Prisma } from '@repo/database';
import { AdPlacementCampaignAdData } from '../../ad-placement-campaign-ad';
import {
  adPlacementSelectFields,
  formatAdPlacementData,
} from '../ad-placement';
import { campaignAdSelectFields, formatCampaignAdData } from '../campaign-ad';

export const adPlacementCampaignAdSelectFields =
  Prisma.validator<Prisma.AdPlacementCampaignAdDefaultArgs>()({
    include: {
      adPlacement: {
        ...adPlacementSelectFields,
      },
      campaignAd: {
        include: {
          ...campaignAdSelectFields.include,
          company: true,
        },
      },
    },
  });

type AdPlacementCampaignAdWithData = Prisma.AdPlacementCampaignAdGetPayload<
  typeof adPlacementCampaignAdSelectFields
>;

export const formatAdPlacementCampaignAdData = (
  adPlacementCampaignAd: AdPlacementCampaignAdWithData
): AdPlacementCampaignAdData => {
  const data: AdPlacementCampaignAdData = {
    ...adPlacementCampaignAd,
    adPlacement: formatAdPlacementData(adPlacementCampaignAd.adPlacement),
    campaignAd: formatCampaignAdData(adPlacementCampaignAd.campaignAd),
    company: adPlacementCampaignAd.campaignAd.company,
  };
  return AdPlacementCampaignAdData.parse(data);
};
