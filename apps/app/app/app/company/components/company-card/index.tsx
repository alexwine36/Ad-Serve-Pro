'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import React from 'react';
import { CompanyDialog } from '../company-dialog';
import { CompanyTable } from '../company-table';

export const CompanyCard: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            Companies
            <CompanyDialog open={open} onOpenChange={setOpen} showTrigger />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CompanyTable />
      </CardContent>
    </Card>
  );
};
