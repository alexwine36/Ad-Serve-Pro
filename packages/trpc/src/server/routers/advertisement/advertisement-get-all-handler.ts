import type { TRPCContextInnerWithSession } from '@/server/create-context';
import { AdvertisementData } from '@repo/common-types';
import { z } from 'zod';
import type { AdvertisementGetAllSchema } from './advertisement-get-all-schema';

type AdvertisementGetAllOptions = {
  ctx: TRPCContextInnerWithSession;
  input: AdvertisementGetAllSchema;
};

export const advertisementGetAllHandler = async ({
  ctx,
  input,
}: AdvertisementGetAllOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.advertisement.findMany({
    where: {
      companyId: input.companyId,
    },
  });
  return z.array(AdvertisementData).parse(res);
};

export type AdvertisementGetAllResponse = Awaited<
  ReturnType<typeof advertisementGetAllHandler>
>;
