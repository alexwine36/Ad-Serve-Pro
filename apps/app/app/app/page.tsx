import { auth } from '@repo/auth/auth';
import { percentageChangeDisplay } from '@repo/common-types';
import {
  BanCard,
  type BanCardProps,
} from '@repo/design-system/components/custom/ban-card';
import { PointerIcon, Users } from 'lucide-react';
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

  const impressions = await caller.stat.adAnalyticsComparison({
    type: 'IMPRESSION',
  });

  const clicks = await caller.stat.adAnalyticsComparison({
    type: 'CLICK',
  });

  const stats: BanCardProps[] = [
    {
      title: 'Impressions',
      description: `${percentageChangeDisplay(
        impressions.previous,
        impressions.current,
        {
          prefix: true,
        }
      )} from last month`,
      value: impressions.current,
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
    {
      title: 'Clicks',
      description: `${percentageChangeDisplay(clicks.previous, clicks.current, {
        prefix: true,
      })} from last month`,
      value: clicks.current,
      prefix: '+',
      icon: (
        <PointerIcon
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
