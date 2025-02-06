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
      ad: {
        companyId: input.companyId,
        company: {
          organizationId: session.user.currentOrganizationId,
        },
      },
    },
    include: {
      client: true,
      ad: {
        select: {
          id: true,
          name: true,
          company: {
            select: {
              id: true,
              name: true,
              organization: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return res;
};

export type AdAnalyticsGetAllResponse = Awaited<
  ReturnType<typeof adAnalyticsGetAllHandler>
>;
