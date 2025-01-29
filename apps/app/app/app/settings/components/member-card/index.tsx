'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { MemberDialog } from '../member-dialog';
import { MemberTable } from '../member-table';
import React from 'react';


export const MemberCard: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                Member
                <MemberDialog open={open} onOpenChange={setOpen} showTrigger />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MemberTable />
          </CardContent>
        </Card>
    )
}