'use client';

import type { CompanyContactData } from '@repo/common-types';
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
// import { CompanyContactForm } from '../company-contact-form';
import dynamic from 'next/dynamic';
import type React from 'react';

const CompanyContactForm = dynamic(() =>
  import('../company-contact-form').then((mod) => mod.CompanyContactForm)
);

export interface CompanyContactDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  companyContact?: CompanyContactData;
  showTrigger?: boolean;
  companyId: string;
}

export const CompanyContactDialog: React.FC<CompanyContactDialogProps> = ({
  companyContact,
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
            {companyContact ? <Edit /> : <PlusIcon />}
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {companyContact ? 'Edit' : 'Create'} Contact
          </DialogTitle>
          <DialogDescription>
            {companyContact
              ? 'Edit an existing Contact'
              : 'Create a new Contact'}
          </DialogDescription>
        </DialogHeader>

        <CompanyContactForm
          companyId={companyId}
          companyContact={companyContact}
          onSuccess={() => {
            onOpenChange?.(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
