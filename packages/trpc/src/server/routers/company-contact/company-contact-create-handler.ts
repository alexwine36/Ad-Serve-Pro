import { CompanyContactData } from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { CompanyContactCreateSchema } from './company-contact-create-schema';

type CompanyContactCreateOptions = {
  ctx: TRPCContextInnerWithSession;
  input: CompanyContactCreateSchema;
};

export const companyContactCreateHandler = async ({
  ctx,
  input,
}: CompanyContactCreateOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.companyContact.create({
    data: { ...input },
  });
  return CompanyContactData.parse(res);
};

export type CompanyContactCreateResponse = Awaited<
  ReturnType<typeof companyContactCreateHandler>
>;
