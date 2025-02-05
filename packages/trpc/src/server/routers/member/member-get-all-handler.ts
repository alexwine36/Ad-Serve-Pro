import type { MemberData } from '@repo/common-types';
import type { TRPCContextInner } from '@repo/trpc/src/server/create-context';
import type { MemberGetAllSchema } from './member-get-all-schema.ts';
type MemberGetAllOptions = {
  ctx: TRPCContextInner;
  input: MemberGetAllSchema;
};

export const memberGetAllHandler = async ({
  ctx,
  input,
}: MemberGetAllOptions): Promise<MemberData[]> => {
  const { prisma, session } = ctx;

  const res = await prisma.member.findMany({
    where: {
      organizationId: session?.user.currentOrganizationId,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return res.map((member) => {
    const { user, ...rest } = member;
    return {
      ...rest,
      name: user?.name,
      image: user?.image,
    };
  });
};

export type MemberGetAllResponse = Awaited<
  ReturnType<typeof memberGetAllHandler>
>;
