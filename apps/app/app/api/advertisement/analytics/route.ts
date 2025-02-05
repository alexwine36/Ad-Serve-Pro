import type { NextRequest } from 'next/server';
import { trpcCaller } from '../../../../utils/trpc-server';

// const content = require('@repo/ad-client/dist/index.js');
async function handler(req: NextRequest) {
  const bodyReq = await req.json();
  console.log('bodyReq', bodyReq);
  const caller = await trpcCaller();
  const res = await caller.adAnalytics.create({
    ...bodyReq,
  });
  console.log('bodyReq', bodyReq);
  const response = Response.json(res);
  return response;
  //   res.headers.set('Content-Type', 'application/javascript');
  //   return scriptContent;
}

export { handler as POST };
