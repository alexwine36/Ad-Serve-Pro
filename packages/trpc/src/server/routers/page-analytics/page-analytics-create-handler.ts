import type { TRPCContextInner } from '@repo/trpc/src/server/create-context';
import type { PageAnalyticsCreateSchema } from './page-analytics-create-schema';

type PageAnalyticsCreateOptions = {
  ctx: TRPCContextInner;
  input: PageAnalyticsCreateSchema;
};

export const pageAnalyticsCreateHandler = async ({
  ctx,
  input,
}: PageAnalyticsCreateOptions) => {
  const { prisma, session } = ctx;

  const client = await prisma.client.upsert({
    where: {
      fingerprint: input.client.fingerprint,
    },
    create: {
      ...input.client,
    },
    update: {
      ...input.client,
    },
  });

  const res = await prisma.pageAnalytics.createMany({
    data: input.events.map((event) => {
      const { timestamp, ...rest } = event;
      return {
        timestamp: new Date(timestamp),
        ...rest,
        clientId: client.id,
      };
    }),
  });
  return res;
};

export type PageAnalyticsCreateResponse = Awaited<
  ReturnType<typeof pageAnalyticsCreateHandler>
>;
