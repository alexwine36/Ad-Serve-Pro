'use client';

import type { CampaignData } from '@repo/common-types';
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
import { CampaignForm } from '../campaign-form';
import type { CampaignTypes } from '../campaign-types';

export interface CampaignDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog>,
    CampaignTypes {
  campaign?: CampaignData;
  showTrigger?: boolean;
}

export const CampaignDialog: React.FC<CampaignDialogProps> = ({
  campaign,
  open,
  onOpenChange,
  showTrigger,
  companyId,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            {campaign ? <Edit /> : <PlusIcon />}
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{campaign ? 'Edit' : 'Create'} Campaign</DialogTitle>
          <DialogDescription>
            {campaign ? 'Edit an existing campaign' : 'Create a new campaign'}
          </DialogDescription>
        </DialogHeader>

        <CampaignForm
          companyId={companyId}
          campaign={campaign}
          onSuccess={() => {
            onOpenChange?.(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
