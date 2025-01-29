import { NumberTicker } from '@repo/design-system/components/ui/number-ticker';
import { database } from '../../../../../packages/database/database';

export const Statistics = async () => {
  interface statsProps {
    quantity: number;
    description: string;
    suffix?: string;
    decimalPlaces?: number;
  }
  const userCount = await database.user.count();
  const companyCount = await database.company.count();
  const stats: statsProps[] = [
    {
      quantity: userCount,
      description: 'Users',
    },
    {
      quantity: 1800,
      description: 'Subscribers',
    },
    {
      quantity: 112,
      description: 'Downloads',
    },
    {
      quantity: companyCount,
      description: 'Companies',
    },
  ];
  const displayStats = stats.map((stat) => {
    if (stat.quantity > 1000) {
      return {
        ...stat,
        quantity: stat.quantity / 1000,
        suffix: 'K+',
        decimalPlaces: 1,
      };
    }
    return stat;
  });
  return (
    <section id="statistics">
      <div className="flex flex-wrap justify-evenly gap-8">
        {displayStats.map(
          ({ quantity, description, suffix, decimalPlaces }: statsProps) => (
            <div key={description} className="space-y-2 text-center">
              <div className="font-bold text-3xl sm:text-4xl">
                <NumberTicker
                  decimalPlaces={decimalPlaces}
                  className=" "
                  value={quantity}
                />
                <span className="inline-block text-black tabular-nums tracking-wider dark:text-white">
                  {suffix}
                </span>
              </div>

              <p className="text-muted-foreground text-xl">{description}</p>
            </div>
          )
        )}
      </div>
    </section>
  );
};
