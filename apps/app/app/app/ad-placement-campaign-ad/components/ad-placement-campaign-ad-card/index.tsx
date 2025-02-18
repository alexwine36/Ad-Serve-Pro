'use client'

import {
Card,
CardContent,
CardHeader,
CardTitle,
} from '@repo/design-system/components/ui/card';
import { AdPlacementCampaignAdDialog } from '../ad-placement-campaign-ad-dialog';
import { AdPlacementCampaignAdTable } from '../ad-placement-campaign-ad-table';
import { AdPlacementCampaignAdTypes } from '../ad-placement-campaign-ad-types';
import React from 'react';


export const AdPlacementCampaignAdCard: React.FC<AdPlacementCampaignAdTypes> = (props) => {
  const [open, setOpen] = React.useState(false);

  return (
  <Card>
    <CardHeader>
      <CardTitle>
        <div className="flex items-center gap-2">
          AdPlacementCampaignAd
          <AdPlacementCampaignAdDialog open={open} onOpenChange={setOpen} showTrigger {...props} />
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <AdPlacementCampaignAdTable {...props} />
    </CardContent>
  </Card>
  )
  }