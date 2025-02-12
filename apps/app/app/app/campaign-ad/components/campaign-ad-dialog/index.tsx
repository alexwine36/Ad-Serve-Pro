'use client';

import type { CampaignAdData } from '@repo/common-types';
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
import { CampaignAdForm } from '../campaign-ad-form';
import type { CampaignAdTypes } from '../campaign-ad-types';

export type CampaignAdDialogProps = React.ComponentPropsWithoutRef<
  typeof Dialog
> &
  CampaignAdTypes & {
    campaignAd?: CampaignAdData;
    showTrigger?: boolean;
  };

export const CampaignAdDialog: React.FC<CampaignAdDialogProps> = ({
  campaignAd,
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
            {campaignAd ? <Edit /> : <PlusIcon />}
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{campaignAd ? 'Edit' : 'Create'} CampaignAd</DialogTitle>
          <DialogDescription>
            {campaignAd
              ? 'Edit an existing campaignAd'
              : 'Create a new campaignAd'}
          </DialogDescription>
        </DialogHeader>

        <CampaignAdForm
          campaignAd={campaignAd}
          {...props}
          onSuccess={() => {
            onOpenChange?.(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
