import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { AdPlacementDeleteSchema } from './ad-placement-delete-schema';

type AdPlacementDeleteOptions = {
  ctx: TRPCContextInnerWithSession;
  input: AdPlacementDeleteSchema;
};

export const adPlacementDeleteHandler = async ({
  ctx,
  input,
}: AdPlacementDeleteOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.adPlacement.delete({
    where: {
      id: input.id,
    },
  });
  return res;
};

export type AdPlacementDeleteResponse = Awaited<
  ReturnType<typeof adPlacementDeleteHandler>
>;
