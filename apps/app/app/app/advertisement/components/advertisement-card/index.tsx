'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import React from 'react';
import { AdvertisementDialog } from '../advertisement-dialog';
import { AdvertisementTable } from '../advertisement-table';
import type { AdvertisementTypes } from '../advertisement-types';

export const AdvertisementCard: React.FC<AdvertisementTypes> = ({
  companyId,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            Advertisement Inventory
            <AdvertisementDialog
              companyId={companyId}
              open={open}
              onOpenChange={setOpen}
              showTrigger
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AdvertisementTable companyId={companyId} />
      </CardContent>
    </Card>
  );
};
