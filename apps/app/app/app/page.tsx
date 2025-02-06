import { auth } from '@repo/auth/auth';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { AdAnalyticsCard } from './ad-analytics/components/ad-analytics-card';
import { Header } from './components/header';
const title = 'Acme Inc';
const description = 'My application.';
export const metadata: Metadata = {
  title,
  description,
};

const App = async () => {
  const session = await auth();
  if (!session?.user.currentOrganizationId) {
    redirect('/');
  }

  return (
    <>
      <Header pages={[]} page="Dashboard" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <AdAnalyticsCard />
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </>
  );
};

export default App;
