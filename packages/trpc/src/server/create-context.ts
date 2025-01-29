import { auth } from '@repo/auth/auth';
import type { Session } from '@repo/auth/types';
import { populateUser } from '@repo/auth/utils/format-user';
import { database } from '@repo/database/database';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';

type CreateContextOptions = Omit<CreateNextContextOptions, 'info'> & {
  info?: CreateNextContextOptions['info'];
};

export type CreateInnerContextOptions = {
  session: Session | null;
} & Partial<CreateContextOptions>;

export type GetSessionFn =
  | ((_options: {
      req: GetServerSidePropsContext['req'] | NextApiRequest;
      res: GetServerSidePropsContext['res'] | NextApiResponse;
    }) => Promise<Session | null>)
  | (() => Promise<Session | null>);

export type InnerContext = CreateInnerContextOptions & {
  prisma: typeof database;
  //   insightsDb: typeof readonlyPrisma;
};

// biome-ignore lint/suspicious/useAwait: <explanation>
export async function createContextInner(
  opts: CreateInnerContextOptions
): Promise<InnerContext> {
  return {
    prisma: database,
    ...opts,
  };
}

const sessionGetter: GetSessionFn = async () => {
  const session = await auth();
  if (!session) {
    return null;
  }
  const user = await populateUser(session.user, database);
  return {
    ...session,
    user: {
      ...session.user,
      ...user,
    },
  };
};

type Context = InnerContext & {
  req: CreateContextOptions['req'];
  res: CreateContextOptions['res'];
};

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async (
  { req, res }: CreateContextOptions
  //   sessionGetter?: GetSessionFn
): Promise<Context> => {
  //   const locale = await getLocale(req);

  // This type may not be accurate if this request is coming from SSG init but they both should satisfy the requirements of getIP.
  // TODO: @sean - figure out a way to make getIP be happy with trpc req. params
  //   const sourceIp = getIP(req as NextApiRequest);
  const session = await sessionGetter({ req, res });
  const contextInner = await createContextInner({ session });
  return {
    ...contextInner,
    req,
    res,
  };
};

export type TRPCContext = Awaited<ReturnType<typeof createContext>>;
export type TRPCContextInner = Awaited<ReturnType<typeof createContextInner>>;
// export type WithLocale<T extends TRPCContext = any> = T &
//   Required<Pick<CreateInnerContextOptions, 'i18n' | 'locale'>>;
// biome-ignore lint/suspicious/noExplicitAny: Fine
export type WithSession<T extends TRPCContext = any> = T &
  Required<Pick<CreateInnerContextOptions, 'session'>>;

export type TRPCContextInnerWithSession = TRPCContextInner & {
  session: Session;
};
