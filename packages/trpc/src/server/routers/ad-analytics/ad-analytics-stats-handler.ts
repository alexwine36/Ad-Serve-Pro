import type { Prisma } from '@repo/database';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { AdAnalyticsStatsSchema } from './ad-analytics-stats-schema';

type AdAnalyticsStatsOptions = {
  ctx: TRPCContextInnerWithSession;
  input: AdAnalyticsStatsSchema;
};

export const adAnalyticsStatsHandler = async ({
  ctx,
  input,
}: AdAnalyticsStatsOptions) => {
  const { prisma, session } = ctx;

  const where: Prisma.AdAnalyticsWhereInput = {};
  if (input.type) {
    where.type = input.type;
  }
  if (input.companyId || input.organizationId) {
    where.ad = {
      company: {
        id: input.companyId,
        organizationId: input.organizationId,
      },
    };
  }

  const res = await prisma.adAnalytics.count({
    where,
  });
  return res;
};

export type AdAnalyticsStatsResponse = Awaited<
  ReturnType<typeof adAnalyticsStatsHandler>
>;
