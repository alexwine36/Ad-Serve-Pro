import type { TRPCContextInnerWithSession } from "@/server/create-context";
import type { MemberUpdateSchema } from "./member-update-schema";

type MemberUpdateOptions = {
  ctx: TRPCContextInnerWithSession;
  input: MemberUpdateSchema;
};

export const memberUpdateHandler = async ({
  ctx,
  input,
}: MemberUpdateOptions) => {
  const { prisma, session } = ctx;
  const { currentOrganizationId } = session.user;
  if (!currentOrganizationId) {
    throw new Error("No organization id found");
  }
  const { prevEmail, email, ...rest } = input;
  console.log("input", input);
  console.log("currentOrganizationId", currentOrganizationId);
  const member = await prisma.member.update({
    where: {
      email_organizationId: {
        email: prevEmail,
        organizationId: currentOrganizationId,
      },
    },
    data: {
      ...rest,
    },
  });
  return member;
};

export type MemberUpdateResponse = Awaited<
  ReturnType<typeof memberUpdateHandler>
>;
