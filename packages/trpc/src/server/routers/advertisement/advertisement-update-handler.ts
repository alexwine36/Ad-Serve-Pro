import { AdvertisementData } from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { AdvertisementUpdateSchema } from './advertisement-update-schema';

type AdvertisementUpdateOptions = {
  ctx: TRPCContextInnerWithSession;
  input: AdvertisementUpdateSchema;
};

export const advertisementUpdateHandler = async ({
  ctx,
  input,
}: AdvertisementUpdateOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.advertisement.update({
    where: {
      id: input.id,
    },
    data: { ...input },
  });
  return AdvertisementData.parse(res);
};

export type AdvertisementUpdateResponse = Awaited<
  ReturnType<typeof advertisementUpdateHandler>
>;
