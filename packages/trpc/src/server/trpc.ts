import type { createContextInner } from '@repo/trpc/src/server/create-context';
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<typeof createContextInner>().create({
  transformer: superjson,
});
// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
export const middleware = t.middleware;
export const createCallerFactory = t.createCallerFactory;
