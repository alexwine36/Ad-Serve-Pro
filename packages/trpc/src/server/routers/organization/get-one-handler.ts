import type { TRPCContextInner } from '@/server/create-context';
import type { GetOneSchema } from './get-one-schema.ts';

type GetOneOptions = {
  ctx: TRPCContextInner;
  input: GetOneSchema;
};

export const getOneHandler = async ({ ctx, input }: GetOneOptions) => {
  const { prisma, session } = ctx;

  const res = await prisma.organization.findFirst({
    where: {
      OR: [
        {
          id: input.id,
        },
        {
          slug: input.slug,
        },
      ],
    },
  });

  return res;
};

export type GetOneResponse = ReturnType<typeof getOneHandler>;
