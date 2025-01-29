import type { NextAuthConfig } from 'next-auth';
import type { Provider } from 'next-auth/providers';
import Google from 'next-auth/providers/google';

export const providers: Provider[] = [Google];

export default {
  providers,
} satisfies NextAuthConfig;
