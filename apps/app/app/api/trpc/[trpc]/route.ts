import { createContext } from '@repo/trpc/dist/server/create-context';
import { appRouter } from '@repo/trpc/dist/server/routers/_app';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
// export API handler
// @link https://trpc.io/docs/v11/server/adapters
// const handler = trpcNext.createNextApiHandler({
//   router: appRouter,
//   createContext: () => ({}),
// });

function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    createContext: createContext as any,
    onError({ error }) {
      console.error('TRPC error', error);
    },
    // createContext: (req, res) => {
    //   createContext},
  });
}

export { handler as GET, handler as POST };
