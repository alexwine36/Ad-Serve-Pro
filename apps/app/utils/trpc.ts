// import { getBaseUrl, type AppRouter } from "@repo/trpc";
import type { AppRouter } from '@repo/trpc';
import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
// import { ssrPrepass } from '@trpc/next/ssrPrepass';
import superjson from 'superjson';
function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return '';
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    const { ctx } = opts;
    // if (typeof window !== 'undefined') {
    //   // during client requests
    //   return {
    //     // transformer: superjson, // optional - adds superjson serialization
    //     links: [
    //       httpBatchLink({
    //         transformer: superjson,
    //         url: '/api/trpc',
    //       }),
    //     ],
    //   };
    // }
    return {
      // transformer: superjson,
      links: [
        httpBatchLink({
          transformer: superjson,
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @see https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,
          // You can pass any HTTP headers you wish here
          headers() {
            if (!ctx?.req?.headers) {
              return {};
            }
            // To use SSR properly, you need to forward client headers to the server
            // This is so you can pass through things like cookies when we're server-side rendering
            return {
              cookie: ctx.req.headers.cookie,
            };
          },
        }),
      ],
    };
  },
  /**
   * @see https://trpc.io/docs/ssr
   **/
  ssr: false,
  transformer: superjson,
});
