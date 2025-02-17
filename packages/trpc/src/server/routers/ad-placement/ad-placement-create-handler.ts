import {
  adPlacementSelectFields,
  formatAdPlacementData,
} from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { AdPlacementCreateSchema } from './ad-placement-create-schema';

type AdPlacementCreateOptions = {
  ctx: TRPCContextInnerWithSession;
  input: AdPlacementCreateSchema;
};

export const adPlacementCreateHandler = async ({
  ctx,
  input,
}: AdPlacementCreateOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.adPlacement.create({
    data: { ...input, organizationId: session?.user.currentOrganizationId },
    ...adPlacementSelectFields,
  });
  return formatAdPlacementData(res);
};

export type AdPlacementCreateResponse = Awaited<
  ReturnType<typeof adPlacementCreateHandler>
>;
