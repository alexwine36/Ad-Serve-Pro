import { appRouter, createCallerFactory, createContext } from '@repo/trpc';
const createCaller = createCallerFactory(appRouter);

export const trpcCaller = async () => {
  // biome-ignore lint/suspicious/noExplicitAny: Don't have correct types yet
  const ctx = await createContext({} as any);
  return createCaller(ctx);
};
