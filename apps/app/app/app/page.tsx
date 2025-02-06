import { auth } from '@repo/auth/auth';
import {
  getComparisonDateRanges,
  percentageChangeDisplay,
} from '@repo/common-types';
import {
  BanCard,
  type BanCardProps,
} from '@repo/design-system/components/custom/ban-card';
import { Users } from 'lucide-react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { trpcCaller } from '../../utils/trpc-server';
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
  const caller = await trpcCaller();
  const comparisonDates = getComparisonDateRanges();
  const curAnalytics = await caller.adAnalytics.stats({
    ...comparisonDates.current,
  });
  const prevAnalytics = await caller.adAnalytics.stats({
    ...comparisonDates.previous,
  });
  console.log({ curAnalytics, prevAnalytics });
  const stats: BanCardProps[] = [
    {
      title: 'Impressions',
      description: `${percentageChangeDisplay(prevAnalytics, curAnalytics, {
        prefix: true,
      })} from last month`,
      value: curAnalytics,
      prefix: '+',
      icon: (
        <Users
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
            <BanCard key={idx} {...stat} />
          ))}
        </div>
        <AdAnalyticsCard />
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </>
  );
};

export default App;
