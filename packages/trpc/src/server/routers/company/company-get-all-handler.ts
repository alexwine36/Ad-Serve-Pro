import type { TRPCContextInnerWithSession } from '@/server/create-context';
import { CompanyData } from '@repo/common-types';
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
  });

  return res.map((company) => CompanyData.parse(company));
};

export type CompanyGetAllResponse = Awaited<
  ReturnType<typeof companyGetAllHandler>
>;
