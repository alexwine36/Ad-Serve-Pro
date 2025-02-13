import { auth } from '@repo/auth/auth';
import { Hourglass, PointerIcon, Users } from 'lucide-react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { trpcCaller } from '../../utils/trpc-server';
import { AdAnalyticsCard } from './ad-analytics/components/ad-analytics-card';
import { Header } from './components/header';
import type { StatsCardProps } from './components/stats-card';
const title = 'Acme Inc';
const description = 'My application.';
export const metadata: Metadata = {
  title,
  description,
};

const StatsCard = dynamic(() =>
  import('./components/stats-card').then((mod) => mod.StatsCard)
);

const App = async () => {
  const session = await auth();
  if (!session?.user.currentOrganizationId) {
    redirect('/');
  }
  const caller = await trpcCaller();

  const impressions = await caller.stat.adAnalyticsComparison({
    type: 'IMPRESSION',
  });

  const clicks = await caller.stat.adAnalyticsComparison({
    type: 'CLICK',
  });

  const loads = await caller.stat.adAnalyticsComparison({
    type: 'LOAD',
  });

  const stats: StatsCardProps[] = [
    {
      title: 'Impressions',
      previous: impressions.previous,
      current: impressions.current,
      icon: (
        <Users
          style={{
            width: '1em',
            height: '1em',
          }}
        />
      ),
    },
    {
      title: 'Clicks',
      previous: clicks.previous,
      current: clicks.current,
      icon: (
        <PointerIcon
          style={{
            width: '1em',
            height: '1em',
          }}
        />
      ),
    },
    {
      title: 'Loads',
      previous: loads.previous,
      current: loads.current,
      icon: (
        <Hourglass
          style={{
            width: '1em',
            height: '1em',
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Header pages={[]} page="Dashboard" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* <div className="grid auto-rows-min gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div> */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <StatsCard key={idx} {...stat} />
          ))}
        </div>
        <AdAnalyticsCard />
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </>
  );
};

export default App;
