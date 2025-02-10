import { formatAdvertisementWithCampaignCount } from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
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
  return Promise.all(
    res.map(async (advertisment) => {
      return await formatAdvertisementWithCampaignCount(advertisment, prisma);
    })
  );
};

export type AdvertisementGetAllResponse = Awaited<
  ReturnType<typeof advertisementGetAllHandler>
>;
