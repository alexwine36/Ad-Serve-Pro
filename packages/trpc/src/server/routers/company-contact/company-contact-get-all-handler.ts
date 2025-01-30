import type { TRPCContextInnerWithSession } from "@/server/create-context";
import type { CompanyContactGetAllSchema } from "./company-contact-get-all-schema";

type CompanyContactGetAllOptions = {
  ctx: TRPCContextInnerWithSession;
  input: CompanyContactGetAllSchema;
};

export const companyContactGetAllHandler = async ({
  ctx,
  input,
}: CompanyContactGetAllOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.companyContact.findMany({
    where: {
      companyId: input.companyId,
      company: {
        organizationId: session.user.currentOrganizationId,
      },
    },
  });

  return res;
};

export type CompanyContactGetAllResponse = Awaited<
  ReturnType<typeof companyContactGetAllHandler>
>;
