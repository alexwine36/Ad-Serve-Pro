import { adServerSelectFields, formatClientAdData } from '@repo/common-types';
import type { TRPCContextInner } from '@repo/trpc/src/server/create-context';
import type { AdServerGetAdsSchema } from './ad-server-get-ads-schema';

type AdServerGetAdsOptions = {
  ctx: TRPCContextInner;
  input: AdServerGetAdsSchema;
};

export const adServerGetAdsHandler = async ({
  ctx,
  input,
}: AdServerGetAdsOptions) => {
  const { prisma } = ctx;
  console.log('INPUT', input);
  const res = await prisma.campaignAd.findMany({
    where: {
      campaign: {
        status: 'ACTIVE',
        company: {
          organizationId: input.organizationId,
        },
      },
      ad: {
        isActive: true,
      },
      isActive: true,
    },

    ...adServerSelectFields,
  });
  console.log('RES', res);

  return formatClientAdData(res, prisma);

  // const lastSeen = await prisma.adAnalytics.groupBy({
  //   by: ['adId'],
  //   where: {
  //     adId: {
  //       in: res.map((campaignAd) => campaignAd.adId),
  //     },
  //   },
  //   _max: {
  //     timestamp: true,
  //   },
  // });

  // const data = res.map((campaignAd) => {
  //   const ad = AdvertisementData.parse(campaignAd.ad);
  //   const lastSeenAd = lastSeen.find(
  //     (lastSeen) => lastSeen.adId === campaignAd.adId
  //   );

  //   return {
  //     lastSeenAd: lastSeenAd?._max.timestamp || new Date(1970, 1, 1),
  //     weight: campaignAd.weight,
  //     ...ad,
  //     id: campaignAd.id,
  //     dimensions: ADVERTISEMENT_SIZES[ad.metadata.size],
  //     //   data: campaignAd,
  //   };
  // });
  // return sortBy(data, [prop('weight'), 'desc'], [prop('lastSeenAd'), 'asc']);
};

export type AdServerGetAdsResponse = Awaited<
  ReturnType<typeof adServerGetAdsHandler>
>;
