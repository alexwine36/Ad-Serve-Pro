import { Prisma } from '@repo/database';
import type { z } from 'zod';
import { AdAnalyticsData } from '../../ad-analytics';
import { AdvertisementData } from '../../advertisement';
import { CampaignData } from '../../campaign';
import { ClientData } from '../../client';
import { CompanyData } from '../../company';

const ExtendedAdAnalyticsData = AdAnalyticsData.extend({
  client: ClientData.pick({
    metadata: true,
    lastSeen: true,
  }),
  ad: AdvertisementData.pick({
    id: true,
    name: true,
  }),
  campaign: CampaignData.pick({
    id: true,
    name: true,
    status: true,
  }),
  company: CompanyData.pick({
    id: true,
    name: true,
  }),
});

export type ExtendedAdAnalyticsData = z.infer<typeof ExtendedAdAnalyticsData>;

export const extendedAdAnalyticsSelectFields =
  Prisma.validator<Prisma.AdAnalyticsDefaultArgs>()({
    include: {
      client: true,
      campaignAd: {
        select: {
          id: true,
          campaign: {
            select: {
              id: true,
              name: true,
              status: true,
              // company: true,
            },
          },
          ad: {
            select: {
              id: true,
              name: true,
            },
          },
          company: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

type AdAnalyticsWithData = Prisma.AdAnalyticsGetPayload<
  typeof extendedAdAnalyticsSelectFields
>;

export const formatExtendedAdAnalyticsData = (
  adAnalytics: AdAnalyticsWithData
): ExtendedAdAnalyticsData => {
  const { client, campaignAd, ...base } = adAnalytics;
  const { ad, campaign, company } = campaignAd;

  // const base = AdAnalyticsData.parse(adAnalytics);
  const data: ExtendedAdAnalyticsData = {
    ...AdAnalyticsData.parse(base),
    client: ClientData.parse(client),
    ad,
    campaign,
    company,
  };
  return ExtendedAdAnalyticsData.parse(data);
};
