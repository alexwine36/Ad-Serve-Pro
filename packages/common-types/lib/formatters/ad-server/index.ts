import { prop, sortBy } from 'remeda';
import { z } from 'zod';
import { Prisma, type PrismaClient } from '../../../../database';
import { ADVERTISEMENT_SIZES, AdvertisementData } from '../../advertisement';
import { CampaignAdData } from '../../campaign-ad';

const NeededAdvertisementData = AdvertisementData.pick({
  type: true,
  content: true,
  metadata: true,
});

export const ClientAdData = z
  .object({
    adId: z.string(),
    dimensions: z.object({
      width: z.number(),
      height: z.number(),
    }),
    lastSeenAd: z.date(),
  })
  .merge(
    CampaignAdData.pick({
      weight: true,
    })
  )
  .merge(
    NeededAdvertisementData.omit({
      metadata: true,
    })
  );

export type ClientAdData = z.infer<typeof ClientAdData>;

export const adServerSelectFields =
  Prisma.validator<Prisma.CampaignAdDefaultArgs>()({
    include: {
      ad: true,
      campaign: {
        select: {
          id: true,
        },
      },
    },
  });

type CampaignAdWithData = Prisma.CampaignAdGetPayload<
  typeof adServerSelectFields
>;

export const formatClientAdData = async (
  res: CampaignAdWithData[],
  prisma: PrismaClient
): Promise<ClientAdData[]> => {
  const lastSeen = await prisma.adAnalytics.groupBy({
    by: ['campaignAdId'],
    where: {
      campaignAdId: {
        in: res.map((campaignAd) => campaignAd.id),
      },
    },
    _max: {
      timestamp: true,
    },
  });

  const data = res.map((campaignAd): ClientAdData => {
    const ad = NeededAdvertisementData.parse(campaignAd.ad);
    const lastSeenCampaignAd = lastSeen.find(
      (lastSeen) => lastSeen.campaignAdId === campaignAd.id
    );
    return {
      ...ad,
      weight: campaignAd.weight,
      adId: campaignAd.id,
      dimensions: ADVERTISEMENT_SIZES[ad.metadata.size],
      lastSeenAd: lastSeenCampaignAd?._max.timestamp || new Date(1970, 1, 1),
    };
  });

  return sortBy(data, [prop('lastSeenAd'), 'asc']);
  //   .map((ad) => ClientAdData.parse(ad));
};
