import { Prisma } from '@repo/database';
import { z } from 'zod';
import { CampaignData } from '../../campaign';

export const CampaignDataWithAdCount = CampaignData.extend({
  adCount: z.number(),
});
export type CampaignDataWithAdCount = z.infer<typeof CampaignDataWithAdCount>;
export const campaignSelectFields =
  Prisma.validator<Prisma.CampaignDefaultArgs>()({
    include: {
      _count: {
        select: {
          ads: {
            where: {
              isActive: true,
              ad: {
                isActive: true,
              },
            },
          },
        },
      },
    },
  });

type CampaignWithAdCount = Prisma.CampaignGetPayload<
  typeof campaignSelectFields
>;

export const formatCampaignQuery = (
  campaign: CampaignWithAdCount
): CampaignDataWithAdCount => {
  return {
    ...CampaignData.parse(campaign),
    adCount: campaign._count.ads,
  };
};
