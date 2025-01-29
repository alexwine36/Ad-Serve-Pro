import type { TRPCContextInnerWithSession } from "@/server/create-context";
import type { MemberCreateSchema } from "./member-create-schema";

type MemberCreateOptions = {
  ctx: TRPCContextInnerWithSession;
  input: MemberCreateSchema;
};

export const memberCreateHandler = async ({
  ctx,
  input,
}: MemberCreateOptions) => {
  const { prisma, session } = ctx;

  const { currentOrganizationId } = session.user;
  if (!currentOrganizationId) {
    throw new Error("No organization id found");
  }
  const { prevEmail, ...rest } = input;
  const res = await prisma.member.create({
    data: {
      ...rest,
      organizationId: currentOrganizationId,
    },
  });

  return res;
};

export type MemberCreateResponse = Awaited<
  ReturnType<typeof memberCreateHandler>
>;
