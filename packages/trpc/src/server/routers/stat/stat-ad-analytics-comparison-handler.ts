import { getComparisonDateRanges } from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { StatAdAnalyticsComparisonSchema } from './stat-ad-analytics-comparison-schema';
import { statAdAnalyticsHandler } from './stat-ad-analytics-handler';

type StatAdAnalyticsComparisonOptions = {
  ctx: TRPCContextInnerWithSession;
  input: StatAdAnalyticsComparisonSchema;
};

export const statAdAnalyticsComparisonHandler = async ({
  ctx,
  input,
}: StatAdAnalyticsComparisonOptions) => {
  const { current, previous } = getComparisonDateRanges(input.days);
  const currentStat = await statAdAnalyticsHandler({
    ctx,
    input: { ...input, ...current },
  });
  const previousStat = await statAdAnalyticsHandler({
    ctx,
    input: { ...input, ...previous },
  });

  return {
    current: currentStat,
    previous: previousStat,
  };
};

export type StatAdAnalyticsComparisonResponse = Awaited<
  ReturnType<typeof statAdAnalyticsComparisonHandler>
>;
