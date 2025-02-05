import type { TRPCContextInnerWithSession } from '@/server/create-context';
import type { AdAnalyticsGetAllSchema } from './ad-analytics-get-all-schema'
import { z } from 'zod';
import { AdAnalyticsData } from "@repo/common-types";

type AdAnalyticsGetAllOptions = {
    ctx: TRPCContextInnerWithSession;
    input: AdAnalyticsGetAllSchema;
}

export const adAnalyticsGetAllHandler = async ({ ctx, input }: AdAnalyticsGetAllOptions) => {

    const { prisma, session } = ctx;
    
    const res = await prisma.adAnalytics.findMany();
    return z.array(AdAnalyticsData).parse(res);
}

export type AdAnalyticsGetAllResponse = Awaited<ReturnType<typeof adAnalyticsGetAllHandler>>;