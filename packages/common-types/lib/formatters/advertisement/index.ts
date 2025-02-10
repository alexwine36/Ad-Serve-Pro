import type { PrismaClient } from '@repo/database';
import { z } from 'zod';
import { AdvertisementData } from '../../advertisement';
import { CampaignStatus } from '../../campaign';

export const AdvertisementCampaignCounts = z.record(CampaignStatus, z.number());
export type AdvertisementCampaignCounts = z.infer<
  typeof AdvertisementCampaignCounts
>;

export const AdvertisementDataWithCampaignCounts = AdvertisementData.extend({
  campaignCounts: AdvertisementCampaignCounts,
});

export type AdvertisementDataWithCampaignCounts = z.infer<
  typeof AdvertisementDataWithCampaignCounts
>;

type NeededTypes = Pick<AdvertisementData, 'id'>;
export const formatAdvertisementWithCampaignCount = async <
  T extends NeededTypes,
>(
  advertisment: T,
  prisma: PrismaClient
) => {
  const res = await prisma.campaign.groupBy({
    by: ['status'],
    where: {
      ads: {
        some: {
          ad: {
            id: advertisment.id,
          },
        },
      },
    },
    _count: true,
  });

  const campaignCounts = res.reduce(
    (acc, curr) => {
      acc[curr.status] = curr._count;
      return acc;
    },
    {} as Record<CampaignStatus, number>
  );
  return AdvertisementDataWithCampaignCounts.parse({
    ...advertisment,
    campaignCounts,
  });
};
