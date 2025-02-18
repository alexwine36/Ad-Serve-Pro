'use client';

import type { AdPlacementCampaignAdData } from '@repo/common-types';
import {
Dialog,
DialogContent,
DialogDescription,
DialogHeader,
DialogTitle,
DialogTrigger,
} from '@repo/design-system/components/ui/dialog';
import type React from 'react';
import { trpc } from '@/utils/trpc';
import { AdPlacementCampaignAdForm } from '../ad-placement-campaign-ad-form';
import { Button } from '@repo/design-system/components/ui/button';
import { Edit, PlusIcon } from 'lucide-react';
import { AdPlacementCampaignAdTypes } from '../ad-placement-campaign-ad-types';

export interface AdPlacementCampaignAdDialogProps
extends React.ComponentPropsWithoutRef<typeof Dialog>, AdPlacementCampaignAdTypes {
  adPlacementCampaignAd?: AdPlacementCampaignAdData;
  showTrigger?: boolean;
  }

  export const AdPlacementCampaignAdDialog: React.FC<AdPlacementCampaignAdDialogProps> = ({
    adPlacementCampaignAd,
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
          {
          adPlacementCampaignAd ?
          <Edit /> :
          <PlusIcon />
          }
        </Button>
      </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{ adPlacementCampaignAd ? 'Edit' : 'Create'} AdPlacementCampaignAd</DialogTitle>
          <DialogDescription>
            { adPlacementCampaignAd ? 'Edit an existing adPlacementCampaignAd' : 'Create a new adPlacementCampaignAd'}
          </DialogDescription>
        </DialogHeader>

        <AdPlacementCampaignAdForm adPlacementCampaignAd={ adPlacementCampaignAd } {...props} onSuccess={()=> {
          onOpenChange?.(false);
          }}
          />
      </DialogContent>
    </Dialog>
    );
    };