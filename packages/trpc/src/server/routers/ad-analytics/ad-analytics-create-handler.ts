import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { AdAnalyticsCreateSchema } from './ad-analytics-create-schema';

type AdAnalyticsCreateOptions = {
  ctx: TRPCContextInnerWithSession;
  input: AdAnalyticsCreateSchema;
};

export const adAnalyticsCreateHandler = async ({
  ctx,
  input,
}: AdAnalyticsCreateOptions) => {
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
  const res = await prisma.adAnalytics.createMany({
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

export type AdAnalyticsCreateResponse = Awaited<
  ReturnType<typeof adAnalyticsCreateHandler>
>;
