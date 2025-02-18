import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { AdPlacementCampaignAdGetAllSchema } from './ad-placement-campaign-ad-get-all-schema'
import { z } from 'zod';
import { formatAdPlacementCampaignAdData,
adPlacementCampaignAdSelectFields
 } from "@repo/common-types";

type AdPlacementCampaignAdGetAllOptions = {
    ctx: TRPCContextInnerWithSession;
    input: AdPlacementCampaignAdGetAllSchema;
}

export const adPlacementCampaignAdGetAllHandler = async ({ ctx, input }: AdPlacementCampaignAdGetAllOptions) => {

    const { prisma, session } = ctx;
    
    const res = await prisma.adPlacementCampaignAd.findMany({
          where: {
            ...input
          },
          ...adPlacementCampaignAdSelectFields
          });
    return res.map(formatAdPlacementCampaignAdData);
}

export type AdPlacementCampaignAdGetAllResponse = Awaited<ReturnType<typeof adPlacementCampaignAdGetAllHandler>>;