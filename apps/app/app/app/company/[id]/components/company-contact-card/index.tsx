'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import React from 'react';
import { CompanyContactDialog } from '../company-contact-dialog';
import { CompanyContactTable } from '../company-contact-table';

export const CompanyContactCard: React.FC<{
  companyId: string;
}> = ({ companyId }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            Contacts
            <CompanyContactDialog
              companyId={companyId}
              open={open}
              onOpenChange={setOpen}
              showTrigger
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CompanyContactTable companyId={companyId} />
      </CardContent>
    </Card>
  );
};
