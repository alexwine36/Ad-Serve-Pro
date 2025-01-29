import authConfig from '@repo/auth/auth.config';
import NextAuth from 'next-auth';

// biome-ignore lint/suspicious/noExplicitAny: No need for a definitiion for middleware
export const { auth: middleware } = NextAuth(authConfig) as any;
