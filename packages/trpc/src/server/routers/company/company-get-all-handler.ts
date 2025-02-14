import {
  extendedCompanySelectFields,
  formatExtendedCompanyData,
} from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import { TRPCError } from '@trpc/server';
import type { CompanyGetAllSchema } from './company-get-all-schema';

type CompanyGetAllOptions = {
  ctx: TRPCContextInnerWithSession;
  input: CompanyGetAllSchema;
};

export const companyGetAllHandler = async ({
  ctx,
  input,
}: CompanyGetAllOptions) => {
  const { prisma, session } = ctx;

  if (!session?.user.currentOrganizationId) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'User does not belong to any organization',
    });
  }

  const res = await prisma.company.findMany({
    where: {
      organizationId: session?.user.currentOrganizationId,
    },
    ...extendedCompanySelectFields,
  });

  return res.map(formatExtendedCompanyData);
};

export type CompanyGetAllResponse = Awaited<
  ReturnType<typeof companyGetAllHandler>
>;
