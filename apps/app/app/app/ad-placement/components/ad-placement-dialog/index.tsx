'use client';

import type { AdPlacementData } from '@repo/common-types';
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
import { AdPlacementForm } from '../ad-placement-form';
import type { AdPlacementTypes } from '../ad-placement-types';

export interface AdPlacementDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog>,
    AdPlacementTypes {
  adPlacement?: AdPlacementData;
  showTrigger?: boolean;
}

export const AdPlacementDialog: React.FC<AdPlacementDialogProps> = ({
  adPlacement,
  open,
  onOpenChange,
  showTrigger,
  ...props
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            {adPlacement ? <Edit /> : <PlusIcon />}
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {adPlacement ? 'Edit' : 'Create'} Ad Placement
          </DialogTitle>
          <DialogDescription>
            {adPlacement
              ? 'Edit an existing Ad Placement'
              : 'Create a new Ad Placement'}
          </DialogDescription>
        </DialogHeader>

        <AdPlacementForm
          adPlacement={adPlacement}
          {...props}
          onSuccess={() => {
            onOpenChange?.(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
