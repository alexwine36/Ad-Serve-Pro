import {
  adPlacementSelectFields,
  formatAdPlacementData,
} from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { AdPlacementGetOneSchema } from './ad-placement-get-one-schema';

type AdPlacementGetOneOptions = {
  ctx: TRPCContextInnerWithSession;
  input: AdPlacementGetOneSchema;
};

export const adPlacementGetOneHandler = async ({
  ctx,
  input,
}: AdPlacementGetOneOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.adPlacement.findFirst({
    where: {
      id: input.id,
    },
    ...adPlacementSelectFields,
  });
  return formatAdPlacementData(res);
};

export type AdPlacementGetOneResponse = Awaited<
  ReturnType<typeof adPlacementGetOneHandler>
>;
