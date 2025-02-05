import { CompanyContactData } from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { CompanyContactGetOneSchema } from './company-contact-get-one-schema';

type CompanyContactGetOneOptions = {
  ctx: TRPCContextInnerWithSession;
  input: CompanyContactGetOneSchema;
};

export const companyContactGetOneHandler = async ({
  ctx,
  input,
}: CompanyContactGetOneOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.companyContact.findFirst({
    where: {
      id: input.id,
    },
  });
  return CompanyContactData.parse(res);
};

export type CompanyContactGetOneResponse = Awaited<
  ReturnType<typeof companyContactGetOneHandler>
>;
