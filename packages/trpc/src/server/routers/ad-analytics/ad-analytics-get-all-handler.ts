import {
  adAnalyticsSelectFields,
  formatAdAnalyticsData,
} from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
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
      campaignAd: {
        ad: {
          companyId: input.companyId,
          company: {
            organizationId: session.user.currentOrganizationId,
          },
        },
      },
    },
    ...adAnalyticsSelectFields,
  });
  return res.map((r) => formatAdAnalyticsData(r));
};

export type AdAnalyticsGetAllResponse = Awaited<
  ReturnType<typeof adAnalyticsGetAllHandler>
>;
