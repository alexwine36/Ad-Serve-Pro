import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import NextAuth, { type NextAuthResult, type Session } from 'next-auth';
import type { BuiltInProviderType } from 'next-auth/providers';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { database, prismaClientHttp } from '@repo/database/database';
import authConfig, { providers } from './auth.config';
import type { User } from './types';
import { populateUser } from './utils/format-user';

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
    currentOrganizationId?: string;
  }
}

export const {
  handlers,
  signIn,
  signOut,
  auth,
}: Omit<NextAuthResult, 'auth' | 'signIn'> & {
  auth: ((
    ...args: [NextApiRequest, NextApiResponse]
  ) => Promise<Session | null>) &
    ((...args: []) => Promise<Session | null>) &
    ((...args: [GetServerSidePropsContext]) => Promise<Session | null>);
  // &
  // ((
  //   ...args: [
  //     (
  //       req: NextAuthRequest,
  //       ctx: AppRouteHandlerFnContext
  //     ) => ReturnType<AppRouteHandlerFn>,
  //   ]
  // ) => AppRouteHandlerFn);
  signIn: <
    P extends BuiltInProviderType | (string & {}),
    R extends boolean = true,
  >(
    /** Provider to sign in to */
    provider?: P, // See: https://github.com/microsoft/TypeScript/issues/29729
    options?:
      | FormData
      | ({
          /** The relative path to redirect to after signing in. By default, the user is redirected to the current page. */
          redirectTo?: string;
          /** If set to `false`, the `signIn` method will return the URL to redirect to instead of redirecting automatically. */
          redirect?: R;
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } & Record<string, any>),
    authorizationParams?:
      | string[][]
      | Record<string, string>
      | string
      | URLSearchParams
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ) => Promise<R extends false ? any : never>;
} = NextAuth({
  adapter: PrismaAdapter(prismaClientHttp),
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, user }) {
      const res = await populateUser(session.user, database);

      return {
        ...session,
        user: {
          ...user,
          ...res,
        },
      };
    },
  },
  ...authConfig,
});

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === 'function') {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    }
    return { id: provider.id, name: provider.name };
  })
  .filter((provider) => provider.id !== 'credentials');
