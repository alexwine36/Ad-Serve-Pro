import type { Prisma } from '@repo/database';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { StatAdAnalyticsSchema } from './stat-ad-analytics-schema';

type StatAdAnalyticsOptions = {
  ctx: TRPCContextInnerWithSession;
  input: StatAdAnalyticsSchema;
};

export const statAdAnalyticsHandler = async ({
  ctx,
  input,
}: StatAdAnalyticsOptions) => {
  const { prisma, session } = ctx;

  const where: Prisma.AdAnalyticsWhereInput = {};
  if (input.type) {
    where.type = input.type;
  }
  if (input.startDate) {
    where.timestamp = {
      gte: input.startDate,
    };
  }
  if (input.endDate) {
    const prev = typeof where.timestamp === 'object' ? where.timestamp : {};
    where.timestamp = {
      ...prev,
      lte: input.endDate,
    };
  }
  // if (!input.includeAll) {
  //   where.ad = {
  //     company: {
  //       organizationId: session.user.currentOrganizationId,
  //     }
  //   }
  // }
  if (input.companyId || !input.includeAll) {
    if (!session) {
      throw new Error('Unauthorized');
    }
    where.campaignAd = {
      ad: {
        company: {
          id: input.companyId,
          organizationId: session.user.currentOrganizationId,
        },
      },
    };
  }

  const res = await prisma.adAnalytics.count({
    where,
  });
  return res;
};

export type StatAdAnalyticsResponse = Awaited<
  ReturnType<typeof statAdAnalyticsHandler>
>;
