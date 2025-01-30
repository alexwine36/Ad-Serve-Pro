import type { TRPCContextInnerWithSession } from '@/server/create-context';
import type { CampaignUpdateSchema } from './campaign-update-schema'
import { z } from 'zod';
import { CampaignData } from "@repo/common-types";

type CampaignUpdateOptions = {
    ctx: TRPCContextInnerWithSession;
    input: CampaignUpdateSchema;
}

export const campaignUpdateHandler = async ({ ctx, input }: CampaignUpdateOptions) => {

    const { prisma, session } = ctx;
    
    const res = await prisma.campaign.update({
          where: {
            id: input.id
          },
          data: {...input}
        });
    return CampaignData.parse(res);
}

export type CampaignUpdateResponse = Awaited<ReturnType<typeof campaignUpdateHandler>>;