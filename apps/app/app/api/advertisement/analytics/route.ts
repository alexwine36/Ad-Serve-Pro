import {
  AdvertisementAnalyticsInput,
  parseDataToHandlers,
} from '@repo/common-types';
import type { NextRequest } from 'next/server';
import { trpcCaller } from '../../../../utils/trpc-server';

// const content = require('@repo/ad-client/dist/index.js');
async function handler(req: NextRequest) {
  const bodyReq = await req.json();

  const content = AdvertisementAnalyticsInput.parse(bodyReq);
  // if (!data.success) {
  //   console.log('data.error', data.error, data);
  // }
  // const content = data.data;

  const { ad, page, client } = parseDataToHandlers(content);
  const caller = await trpcCaller();
  const responseData: {
    count: number;
  } = {
    count: 0,
  };

  if (ad.length > 0) {
    try {
      const res = await caller.adAnalytics.create({
        client,
        events: ad,
      });
      responseData.count += res.count;
    } catch (error) {
      console.error('ad error', error);
    }
  }

  if (page.length > 0) {
    try {
      const res = await caller.pageAnalytics.create({
        client,
        events: page,
      });
      responseData.count += res.count;
    } catch (error) {
      console.error('page error', error);
    }
  }

  const response = Response.json(responseData);
  return response;
  //   res.headers.set('Content-Type', 'application/javascript');
  //   return scriptContent;
}

export { handler as POST };
