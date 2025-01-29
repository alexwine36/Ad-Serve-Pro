'use client';

import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { NumberTicker } from '../../ui/number-ticker';

export interface BanCardProps {
  title: string;
  description?: string;
  icon?: React.ReactElement;
  value: number;
  prefix?: string;
  animated?: boolean;
  decimalPlaces?: number;
}

export const BanCard: React.FC<BanCardProps> = ({
  title,
  description,
  prefix,
  animated = true,
  decimalPlaces,
  value,
  icon,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium text-sm">{title}</CardTitle>
        {icon ? (
          <div className="flex items-center justify-center rounded-full p-1 text-md">
            {icon}
          </div>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center ">
            {/* <div className="text-2xl text-white">💵</div> */}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {animated ? (
          <div className="font-bold text-2xl">
            {prefix}
            <NumberTicker decimalPlaces={decimalPlaces} value={value} />
          </div>
        ) : (
          <div className="font-bold text-2xl">
            {prefix}
            {value.toFixed(decimalPlaces)}
          </div>
        )}
        {/* <div className="text-2xl font-bold">$45,231.89</div> */}
        <p className="text-muted-foreground text-xs">{description}</p>
      </CardContent>
    </Card>
  );
};
