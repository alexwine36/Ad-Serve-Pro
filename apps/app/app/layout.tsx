import '@repo/ad-client/dist/index';
import { fonts } from '@repo/design-system/lib/fonts';
import '@repo/design-system/styles/globals.css';
import type { ReactNode } from 'react';
import { Providers } from '../src/components/providers';
import './index.css';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang="en" className={fonts} suppressHydrationWarning>
    <head>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"
        rel="stylesheet"
      />
      <script
        id="ad-analytics"
        data-org-id="cm6i8ljl000003r2hi500hi4s"
        data-debug="true"
        // data-endpoint="/api/analytics"
        src="/analytics/client.js"
        type="module"
      />

      <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js" />
    </head>
    <body>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
