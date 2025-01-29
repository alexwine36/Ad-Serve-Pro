import { router } from '@/server/trpc';
import { z } from 'zod';
import publicProcedure from '../procedures/public-procedure';

// Imports

import { companyRouter } from './company/_router';

import { memberRouter } from './member/_router';

import { userRouter } from './user/_router';

import { organizationRouter } from '@/server/routers/organization/_router'; //'./organization/_router';

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),
  // Handlers

  company: companyRouter,

  member: memberRouter,

  user: userRouter,

  organization: organizationRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
