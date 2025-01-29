import type { TRPCContextInnerWithSession } from "@/server/create-context";
import type { OrganizationGetOneSchema } from "./organization-get-one-schema";

type OrganizationGetOneOptions = {
  ctx: TRPCContextInnerWithSession;
  input: OrganizationGetOneSchema;
};

export const organizationGetOneHandler = async ({
  ctx,
  input,
}: OrganizationGetOneOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.organization.findFirst({
    where: {
      id: input.id,
      members: {
        some: {
          email: session?.user.email,
        },
      },
    },
  });

  return res;
};

export type OrganizationGetOneResponse = Awaited<
  ReturnType<typeof organizationGetOneHandler>
>;
