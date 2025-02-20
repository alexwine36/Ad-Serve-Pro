'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import React from 'react';
import { AdPlacementDialog } from '../ad-placement-dialog';
import { AdPlacementTable } from '../ad-placement-table';
import type { AdPlacementTypes } from '../ad-placement-types';

export const AdPlacementCard: React.FC<AdPlacementTypes> = (props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            Ad Placements
            <AdPlacementDialog
              open={open}
              onOpenChange={setOpen}
              showTrigger
              {...props}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AdPlacementTable {...props} />
      </CardContent>
    </Card>
  );
};
