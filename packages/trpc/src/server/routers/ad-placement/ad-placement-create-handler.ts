import {
  adPlacementSelectFields,
  formatAdPlacementData,
} from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import { TRPCError } from '@trpc/server';
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
  const organizationId = session.user.currentOrganizationId;
  if (!organizationId) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'User does not belong to an organization',
    });
  }
  const res = await prisma.adPlacement.create({
    data: { ...input, organizationId },
    ...adPlacementSelectFields,
  });
  return formatAdPlacementData(res);
};

export type AdPlacementCreateResponse = Awaited<
  ReturnType<typeof adPlacementCreateHandler>
>;
