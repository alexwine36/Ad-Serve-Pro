'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import type React from 'react';
import { AdAnalyticsTable } from '../ad-analytics-table';
import type { AdAnalyticsTypes } from '../ad-analytics-types';

export const AdAnalyticsCard: React.FC<AdAnalyticsTypes> = ({
  companyId,
  organizationId,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">AdAnalytics</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AdAnalyticsTable
          companyId={companyId}
          organizationId={organizationId}
        />
      </CardContent>
    </Card>
  );
};
