import { AdvertisementData } from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { AdvertisementCreateSchema } from './advertisement-create-schema';

type AdvertisementCreateOptions = {
  ctx: TRPCContextInnerWithSession;
  input: AdvertisementCreateSchema;
};

export const advertisementCreateHandler = async ({
  ctx,
  input,
}: AdvertisementCreateOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.advertisement.create({
    data: { ...input },
  });
  return AdvertisementData.parse(res);
};

export type AdvertisementCreateResponse = Awaited<
  ReturnType<typeof advertisementCreateHandler>
>;
