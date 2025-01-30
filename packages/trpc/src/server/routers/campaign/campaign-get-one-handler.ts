import type { TRPCContextInnerWithSession } from '@/server/create-context';
import type { CampaignGetOneSchema } from './campaign-get-one-schema'
import { z } from 'zod';
import { CampaignData } from "@repo/common-types";

type CampaignGetOneOptions = {
    ctx: TRPCContextInnerWithSession;
    input: CampaignGetOneSchema;
}

export const campaignGetOneHandler = async ({ ctx, input }: CampaignGetOneOptions) => {

    const { prisma, session } = ctx;
    
    const res = await prisma.campaign.findFirst({
          where: {
            id: input.id
          }
        });
    return CampaignData.parse(res);
}

export type CampaignGetOneResponse = Awaited<ReturnType<typeof campaignGetOneHandler>>;