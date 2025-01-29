import { auth } from '@repo/auth/auth';
import type { Session } from '@repo/auth/types';
import { formatUser } from '@repo/auth/utils/format-user';
import { TRPCError } from '@trpc/server';
import type { TRPCContextInner } from '../create-context';
import { middleware } from '../trpc';

type Maybe<T> = T | null | undefined;

export async function getUserFromSession(
  ctx: TRPCContextInner,
  session: Maybe<Session>
) {
  if (!session) {
    return null;
  }

  if (!session.user) {
    return null;
  }

  const user = formatUser(session.user);

  return {
    ...user,
  };
}

export type UserFromSession = Awaited<ReturnType<typeof getUserFromSession>>;

const getSession = async (ctx: TRPCContextInner) => {
  const { req, res } = ctx;

  return req ? await auth() : null;
};

export const getUserSession = async (ctx: TRPCContextInner) => {
  const session = ctx.session || (await getSession(ctx));

  const user = session ? await getUserFromSession(ctx, session) : null;

  return {
    user,
    session,
  };
};

const sessionMiddleware = middleware(async ({ ctx, next }) => {
  const middlewareStart = performance.now();
  const { user, session } = await getUserSession(ctx);
  const middlewareEnd = performance.now();
  console.debug('Perf:t.sessionMiddleware', middlewareEnd - middlewareStart);
  return next({
    ctx: { user, session },
  });
});

export const isAuthed = middleware(async ({ ctx, next }) => {
  const middlewareStart = performance.now();

  const { user, session } = await getUserSession(ctx);

  const middlewareEnd = performance.now();
  console.debug('Perf:t.isAuthed', middlewareEnd - middlewareStart);

  if (!user || !session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: { user, session },
  });
});

export const isAdminMiddleware = isAuthed.unstable_pipe(({ ctx, next }) => {
  const { user } = ctx;
  // if (user?.role !== 'ADMIN') {
  //   throw new TRPCError({ code: 'UNAUTHORIZED' });
  // }
  return next({ ctx: { user: user } });
});

// Org admins can be admins or owners
export const isOrgAdminMiddleware = isAuthed.unstable_pipe(({ ctx, next }) => {
  const { user } = ctx;
  // NOTE: This is a placeholder for now. We need to implement this in the future.
  // if (!user?.organization?.isOrgAdmin) {
  //   throw new TRPCError({ code: 'UNAUTHORIZED' });
  // }
  return next({ ctx: { user: user } });
});

export default sessionMiddleware;
