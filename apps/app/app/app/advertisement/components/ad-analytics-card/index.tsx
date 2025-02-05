'use client'

import {
Card,
CardContent,
CardHeader,
CardTitle,
} from '@repo/design-system/components/ui/card';
import { AdAnalyticsDialog } from '../ad-analytics-dialog';
import { AdAnalyticsTable } from '../ad-analytics-table';
import { AdAnalyticsTypes } from '../ad-analytics-types';
import React from 'react';


export const AdAnalyticsCard: React.FC<AdAnalyticsTypes> = () => {
  const [open, setOpen] = React.useState(false);

  return (
  <Card>
    <CardHeader>
      <CardTitle>
        <div className="flex items-center gap-2">
          AdAnalytics
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <AdAnalyticsTable />
    </CardContent>
  </Card>
  )
  }