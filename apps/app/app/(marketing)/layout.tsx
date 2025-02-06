import type { ReactNode } from 'react';
import { Navbar } from './components/navbar';
import { ScrollToTop } from './components/scroll-to-top';

type MarketingLayoutProps = {
  readonly children: ReactNode;
};
const MarketingLayout = ({ children }: MarketingLayoutProps) => {
  return (
    <>
      <script
        id="ad-analytics"
        data-org-id="cm6i8ljl000003r2hi500hi4s"
        data-debug="true"
        // data-endpoint="/api/analytics"
        src="/analytics/client.js"
        type="module"
      />
      <div className="max-w-screen">
        <Navbar />
        {children}
        <ScrollToTop />
      </div>
    </>
  );
};

export default MarketingLayout;
