'use client';

import type { AdvertisementData } from '@repo/common-types';
import { Button } from '@repo/design-system/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/design-system/components/ui/dialog';
import { Edit, PlusIcon } from 'lucide-react';
import type React from 'react';
import { AdvertisementForm } from '../advertisement-form';
import type { AdvertisementTypes } from '../advertisement-types';

export interface AdvertisementDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog>,
    AdvertisementTypes {
  advertisement?: AdvertisementData;
  showTrigger?: boolean;
}

export const AdvertisementDialog: React.FC<AdvertisementDialogProps> = ({
  advertisement,
  open,
  onOpenChange,
  showTrigger,
  companyId,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            {advertisement ? <Edit /> : <PlusIcon />}
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {advertisement ? 'Edit' : 'Create'} Advertisement
          </DialogTitle>
          <DialogDescription>
            {advertisement
              ? 'Edit an existing advertisement'
              : 'Create a new advertisement'}
          </DialogDescription>
        </DialogHeader>

        <AdvertisementForm
          companyId={companyId}
          advertisement={advertisement}
          onSuccess={() => {
            onOpenChange?.(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
