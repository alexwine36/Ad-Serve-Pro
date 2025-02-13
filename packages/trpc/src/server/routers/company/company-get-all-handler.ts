import {
  extendedCompanySelectFields,
  formatExtendedCompanyData,
} from '@repo/common-types';
import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
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
