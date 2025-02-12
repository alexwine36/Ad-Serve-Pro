'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import React from 'react';
import { CampaignAdDialog } from '../campaign-ad-dialog';
import { CampaignAdTable } from '../campaign-ad-table';
import type { CampaignAdTypes } from '../campaign-ad-types';

export const CampaignAdCard: React.FC<CampaignAdTypes> = (props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            {props.source === 'ADVERTISEMENT' ? 'Advertisements' : 'Campaigns'}
            <CampaignAdDialog
              open={open}
              onOpenChange={setOpen}
              showTrigger
              {...props}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CampaignAdTable {...props} />
      </CardContent>
    </Card>
  );
};
