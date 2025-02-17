import {
  adPlacementSelectFields,
  formatAdPlacementData,
} from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { AdPlacementGetAllSchema } from './ad-placement-get-all-schema';

type AdPlacementGetAllOptions = {
  ctx: TRPCContextInnerWithSession;
  input: AdPlacementGetAllSchema;
};

export const adPlacementGetAllHandler = async ({
  ctx,
  input,
}: AdPlacementGetAllOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.adPlacement.findMany({
    where: {
      ...input,
    },
    ...adPlacementSelectFields,
  });
  return res.map(formatAdPlacementData);
};

export type AdPlacementGetAllResponse = Awaited<
  ReturnType<typeof adPlacementGetAllHandler>
>;
