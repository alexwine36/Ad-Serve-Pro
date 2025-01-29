import type { TRPCContextInner } from '@/server/create-context';
import type { UpdateSchema } from './update-schema.ts';

type UpdateOptions = {
  ctx: TRPCContextInner;
  input: UpdateSchema;
};

export const updateHandler = async ({ ctx, input }: UpdateOptions) => {
  const { prisma, session } = ctx;
  const { social, ...rest } = input;
  const res = await prisma.organization.update({
    where: {
      id: input.id,
      members: {
        some: {
          email: session?.user?.email,
        },
      },
    },
    data: {
      ...rest,
    },
  });

  return res;
};

export type UpdateResponse = ReturnType<typeof updateHandler>;
