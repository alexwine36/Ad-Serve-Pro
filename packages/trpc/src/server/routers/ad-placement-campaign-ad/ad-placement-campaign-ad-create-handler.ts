import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { AdPlacementCampaignAdCreateSchema } from './ad-placement-campaign-ad-create-schema'
import { z } from 'zod';
import { formatAdPlacementCampaignAdData,
adPlacementCampaignAdSelectFields
 } from "@repo/common-types";

type AdPlacementCampaignAdCreateOptions = {
    ctx: TRPCContextInnerWithSession;
    input: AdPlacementCampaignAdCreateSchema;
}

export const adPlacementCampaignAdCreateHandler = async ({ ctx, input }: AdPlacementCampaignAdCreateOptions) => {

    const { prisma, session } = ctx;
    
    const res = await prisma.adPlacementCampaignAd.create({
          data: {...input},
          ...adPlacementCampaignAdSelectFields
        });
    return formatAdPlacementCampaignAdData(res);
}

export type AdPlacementCampaignAdCreateResponse = Awaited<ReturnType<typeof adPlacementCampaignAdCreateHandler>>;