import type { TRPCContextInnerWithSession } from '@/server/create-context';
import type { CampaignCreateSchema } from './campaign-create-schema'
import { z } from 'zod';
import { CampaignData } from "@repo/common-types";

type CampaignCreateOptions = {
    ctx: TRPCContextInnerWithSession;
    input: CampaignCreateSchema;
}

export const campaignCreateHandler = async ({ ctx, input }: CampaignCreateOptions) => {

    const { prisma, session } = ctx;
    
    const res = await prisma.campaign.create({
          data: {...input}
        });
    return CampaignData.parse(res);
}

export type CampaignCreateResponse = Awaited<ReturnType<typeof campaignCreateHandler>>;