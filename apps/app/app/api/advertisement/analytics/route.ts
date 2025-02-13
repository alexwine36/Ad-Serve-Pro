import {
  AdvertisementAnalyticsInput,
  parseDataToHandlers,
} from '@repo/common-types';
import type { NextRequest } from 'next/server';
import { trpcCaller } from '../../../../utils/trpc-server';

// const content = require('@repo/ad-client/dist/index.js');
async function handler(req: NextRequest) {
  const bodyReq = await req.json();
  console.log('bodyReq', bodyReq);
  const content = AdvertisementAnalyticsInput.parse(bodyReq);
  const { ad, page, client } = parseDataToHandlers(content);
  const caller = await trpcCaller();

  if (ad.length > 0) {
    const res = await caller.adAnalytics.create({
      client,
      events: ad,
    });
    const response = Response.json(res);
    return response;
  }
  if (page.length > 0) {
    const res = await caller.pageAnalytics.create({
      client,
      events: page,
    });
    const response = Response.json(res);
    return response;
  }
  console.log('bodyReq', bodyReq);

  //   res.headers.set('Content-Type', 'application/javascript');
  //   return scriptContent;
}

export { handler as POST };
