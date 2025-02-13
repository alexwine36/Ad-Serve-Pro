import { database } from '@repo/database/database';
import type { ReactNode } from 'react';
import { Navbar } from './components/navbar';
import { ScrollToTop } from './components/scroll-to-top';

type MarketingLayoutProps = {
  readonly children: ReactNode;
};

const getDefaultCompany = async () => {
  try {
    const defaultOrg = await database.organization.findFirst({
      where: {
        name: 'Acme Inc.',
      },
    });
    return defaultOrg?.id;
  } catch (error) {
    console.error('Error fetching default company', error);
    return '';
  }
};

const MarketingLayout = async ({ children }: MarketingLayoutProps) => {
  const defaultOrgId = await getDefaultCompany();
  return (
    <>
      <script
        id="ad-analytics"
        data-org-id={defaultOrgId}
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
