import type { TRPCContextInnerWithSession } from '@/server/create-context';
import { CampaignData } from "@repo/common-types";
import { z } from 'zod';
import type { CampaignGetAllSchema } from './campaign-get-all-schema';

type CampaignGetAllOptions = {
    ctx: TRPCContextInnerWithSession;
    input: CampaignGetAllSchema;
}

export const campaignGetAllHandler = async ({ ctx, input }: CampaignGetAllOptions) => {

    const { prisma, session } = ctx;
    
    const res = await prisma.campaign.findMany({
        where: {
            company: {
                organizationId: session?.user.currentOrganizationId,
            },

            companyId: input.companyId,
        }
    });
    return z.array(CampaignData).parse(res);
}

export type CampaignGetAllResponse = Awaited<ReturnType<typeof campaignGetAllHandler>>;