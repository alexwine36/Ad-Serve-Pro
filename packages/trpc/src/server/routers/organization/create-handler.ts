import type { TRPCContextInner } from '@/server/create-context';
import { toKebabCase } from 'remeda';
import type { CreateSchema } from './create-schema.ts';

type CreateOptions = {
  ctx: TRPCContextInner;
  input: CreateSchema;
};

const slugify = (name: string) => {
  return toKebabCase(name);
};

export const createHandler = async ({ ctx, input }: CreateOptions) => {
  const { prisma, session } = ctx;
  if (!session) {
    throw new Error('Not authenticated');
  }
  const user = session.user;
  const { social, ...rest } = input;
  const res = await prisma.organization.create({
    data: {
      // name,
      // slug: slug || slugify(name),
      // type: 'Something',
      ...rest,
      members: {
        create: {
          role: 'OWNER',
          email: user.email,
        },
      },
    },
  });

  return res;
};

export type CreateResponse = ReturnType<typeof createHandler>;
