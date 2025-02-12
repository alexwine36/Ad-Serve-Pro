import { Prisma } from '@repo/database';
import { AdvertisementData } from '../../advertisement';
import { CampaignData } from '../../campaign';
import type { CampaignAdData } from '../../campaign-ad';

export const campaignAdSelectFields =
  Prisma.validator<Prisma.CampaignAdDefaultArgs>()({
    include: {
      campaign: true,
      ad: true,
    },
  });

type CampaignAdWithData = Prisma.CampaignAdGetPayload<
  typeof campaignAdSelectFields
>;

export const formatCampaignAdData = (
  campaignAd: CampaignAdWithData
): CampaignAdData => {
  return {
    ...campaignAd,
    ad: AdvertisementData.parse(campaignAd.ad),
    campaign: CampaignData.parse(campaignAd.campaign),
  };
};
