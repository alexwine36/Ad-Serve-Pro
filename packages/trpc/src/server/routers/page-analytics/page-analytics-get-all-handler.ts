import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { PageAnalyticsGetAllSchema } from './page-analytics-get-all-schema'
import { z } from 'zod';
import { formatPageAnalyticsData,
pageAnalyticsSelectFields
 } from "@repo/common-types";

type PageAnalyticsGetAllOptions = {
    ctx: TRPCContextInnerWithSession;
    input: PageAnalyticsGetAllSchema;
}

export const pageAnalyticsGetAllHandler = async ({ ctx, input }: PageAnalyticsGetAllOptions) => {

    const { prisma, session } = ctx;
    
    const res = await prisma.pageAnalytics.findMany({
          where: {
            ...input
          },
          ...pageAnalyticsSelectFields
          });
    return res.map(formatPageAnalyticsData);
}

export type PageAnalyticsGetAllResponse = Awaited<ReturnType<typeof pageAnalyticsGetAllHandler>>;