import type { TRPCContextInnerWithSession } from '@/server/create-context';
import { AdvertisementData } from '@repo/common-types';
import type { AdvertisementGetOneSchema } from './advertisement-get-one-schema';

type AdvertisementGetOneOptions = {
  ctx: TRPCContextInnerWithSession;
  input: AdvertisementGetOneSchema;
};

export const advertisementGetOneHandler = async ({
  ctx,
  input,
}: AdvertisementGetOneOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.advertisement.findFirst({
    where: {
      id: input.id,
    },
  });
  return AdvertisementData.parse(res);
};

export type AdvertisementGetOneResponse = Awaited<
  ReturnType<typeof advertisementGetOneHandler>
>;
