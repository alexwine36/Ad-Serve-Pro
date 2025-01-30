'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import React from 'react';
import { CampaignDialog } from '../campaign-dialog';
import { CampaignTable } from '../campaign-table';
import type { CampaignTypes } from '../campaign-types';

export const CampaignCard: React.FC<CampaignTypes> = ({ companyId }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            Campaign
            <CampaignDialog
              companyId={companyId}
              open={open}
              onOpenChange={setOpen}
              showTrigger
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CampaignTable companyId={companyId} />
      </CardContent>
    </Card>
  );
};
