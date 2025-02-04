import fs from 'fs';

const content = fs.readFileSync(
  '../../../node_modules/@repo/ad-client/dist/index.js'
);

// const content = require('@repo/ad-client/dist/index.js');
function handler(req: Request) {
  console.log('req', req.url);
  //   console.log(content);
  const scriptContent = `
    ${content}

    window.adAnalytics = new window.Analytics({
        organizationId: '123',
        endpoint: 'http://sample.com/api/analytics',
        debug: true,
        cacheTimeout: 24 * 60 * 60 * 1000,
    })
    `;
  const newHeaders = new Headers(req.headers);
  newHeaders.set('Content-Type', 'application/javascript');
  //   res.('Content-Type', 'application/javascript');
  //   return scriptContent
  const response = new Response(scriptContent, {
    headers: newHeaders,
  });
  return response;
  //   res.headers.set('Content-Type', 'application/javascript');
  //   return scriptContent;
}

export { handler as GET };
