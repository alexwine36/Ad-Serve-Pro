import { AdAnalyticsData } from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import { z } from 'zod';
import type { AdAnalyticsGetAllSchema } from './ad-analytics-get-all-schema';

type AdAnalyticsGetAllOptions = {
  ctx: TRPCContextInnerWithSession;
  input: AdAnalyticsGetAllSchema;
};

export const adAnalyticsGetAllHandler = async ({
  ctx,
  input,
}: AdAnalyticsGetAllOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.adAnalytics.findMany({
    where: {
      ad: {
        companyId: input.companyId,
        company: {
          organizationId: input.organizationId,
        },
      },
    },
  });
  return z.array(AdAnalyticsData).parse(res);
};

export type AdAnalyticsGetAllResponse = Awaited<
  ReturnType<typeof adAnalyticsGetAllHandler>
>;
