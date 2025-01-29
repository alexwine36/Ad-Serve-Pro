'use client';

import type { MemberData } from '@repo/common-types';
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
import { MemberForm } from '../member-form';
import { Button } from '@repo/design-system/components/ui/button';
import { Edit, PlusIcon } from 'lucide-react';

export interface MemberDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  member?: MemberData;
  showTrigger?: boolean;
}

export const MemberDialog: React.FC<MemberDialogProps> = ({
  member,
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
              member ? <Edit /> : <PlusIcon />
            }
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{ member ? 'Edit' : 'Create'} Member</DialogTitle>
          <DialogDescription>
            { member ? 'Edit an existing member' : 'Create a new member'}
          </DialogDescription>
        </DialogHeader>

        <MemberForm
          member={ member }
          onSuccess={() => {
            onOpenChange?.(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
