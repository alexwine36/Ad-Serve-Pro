'use client';

import type { CompanyContactData } from '@repo/common-types';
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
import { CompanyContactForm } from '../company-contact-form';
import { Button } from '@repo/design-system/components/ui/button';
import { Edit, PlusIcon } from 'lucide-react';

export interface CompanyContactDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  companyContact?: CompanyContactData;
  showTrigger?: boolean;
}

export const CompanyContactDialog: React.FC<CompanyContactDialogProps> = ({
  companyContact,
  open,
  onOpenChange,
  showTrigger
}) => {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
         {showTrigger ? (
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            {
              companyContact ? <Edit /> : <PlusIcon />
            }
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{ companyContact ? 'Edit' : 'Create'} CompanyContact</DialogTitle>
          <DialogDescription>
            { companyContact ? 'Edit an existing companyContact' : 'Create a new companyContact'}
          </DialogDescription>
        </DialogHeader>

        <CompanyContactForm
          companyContact={ companyContact }
          onSuccess={() => {
            onOpenChange?.(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
