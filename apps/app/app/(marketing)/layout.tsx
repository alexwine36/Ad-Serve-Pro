import type { ReactNode } from 'react';
import { Navbar } from './components/navbar';
import { ScrollToTop } from './components/scroll-to-top';

type MarketingLayoutProps = {
  readonly children: ReactNode;
};
const MarketingLayout = ({ children }: MarketingLayoutProps) => {
  return (
    <div className="max-w-screen">
      <Navbar />
      {children}
      <ScrollToTop />
    </div>
  );
};

export default MarketingLayout;
