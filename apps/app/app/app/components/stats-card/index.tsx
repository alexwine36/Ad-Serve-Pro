import { percentageChangeDisplay } from '@repo/common-types';
import {
  BanCard,
  type BanCardProps,
} from '@repo/design-system/components/custom/ban-card';
import { useMemo } from 'react';

export type StatsCardProps = {
  title: string;
  previous: number;
  current: number;
  prefix?: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  icon: any;
  duration?: string;
};

export const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  title,
  prefix,
  previous,
  current,
  duration = 'month',
}) => {
  const banProps = useMemo((): BanCardProps => {
    let prefixVal = current > previous ? '+' : '-';
    if (prefix) {
      prefixVal = prefix;
    }
    return {
      title,
      description: `${percentageChangeDisplay(previous, current, {
        prefix: true,
      })} from last ${duration}`,
      value: current,
      prefix: prefixVal,
      icon: icon,
    };
  }, [title, current, previous, prefix, icon, duration]);

  return <BanCard {...banProps} />;
};
