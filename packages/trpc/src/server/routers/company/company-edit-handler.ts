import { CompanyData } from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { CompanyEditSchema } from './company-edit-schema';

type CompanyEditOptions = {
  ctx: TRPCContextInnerWithSession;
  input: CompanyEditSchema;
};

export const companyEditHandler = async ({
  ctx,
  input,
}: CompanyEditOptions) => {
  const { prisma, session } = ctx;
  const { social, ...rest } = input;
  const res = await prisma.company.update({
    where: {
      id: input.id,
      organizationId: session.user.currentOrganizationId,
    },
    data: {
      ...rest,
    },
  });

  return CompanyData.parse(res);
};

export type CompanyEditResponse = Awaited<
  ReturnType<typeof companyEditHandler>
>;
