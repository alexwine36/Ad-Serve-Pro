import { CompanyContactData } from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { CompanyContactUpdateSchema } from './company-contact-update-schema';

type CompanyContactUpdateOptions = {
  ctx: TRPCContextInnerWithSession;
  input: CompanyContactUpdateSchema;
};

export const companyContactUpdateHandler = async ({
  ctx,
  input,
}: CompanyContactUpdateOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.companyContact.update({
    where: {
      id: input.id,
    },
    data: { ...input },
  });
  return CompanyContactData.parse(res);
};

export type CompanyContactUpdateResponse = Awaited<
  ReturnType<typeof companyContactUpdateHandler>
>;
