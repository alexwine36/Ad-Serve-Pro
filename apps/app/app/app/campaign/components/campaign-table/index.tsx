'use client';

import { trpc } from '@/utils/trpc';
import type { CampaignData } from '@repo/common-types';
import type { DataTableRowAction } from '@repo/design-system/components/custom/data-table';
import { DataTable } from '@repo/design-system/components/custom/data-table';
import { Button } from '@repo/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { useDataTable } from '@repo/design-system/hooks/use-datatable';
import { Ellipsis, Eye } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { CampaignDialog } from '../campaign-dialog';
import { CampaignStatusBadge } from '../campaign-status-badge';
import type { CampaignTypes } from '../campaign-types';

export const CampaignTable: React.FC<CampaignTypes> = ({ companyId }) => {
  const { data, isLoading } = trpc.campaign.getAll.useQuery({
    companyId,
  });
  const [rowAction, setRowAction] = useState<
    DataTableRowAction<CampaignData> | undefined
  >(undefined);

  const table = useDataTable({
    data: data || [],
    loading: isLoading,
    columns: [
      {
        accessorKey: 'id',
        header: '',
        size: 40,
        cell: ({ cell }) => {
          const id = cell.getValue<string>();
          return (
            <Button variant={'ghost'} size={'icon'} asChild>
              <Link href={`/app/company/${companyId}/campaign/${id}`}>
                <Eye />
              </Link>
            </Button>
          );
        },
      },
      {
        accessorKey: 'name',
        header: 'Name',
        enableSorting: true,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ cell }) => {
          const status = cell.getValue<CampaignData['status']>();
          return <CampaignStatusBadge status={status} />;
        },
      },
      {
        accessorKey: 'budget',
        header: 'Budget',
      },
      {
        accessorKey: 'adCount',
        header: 'Ads',
      },
      // {
      //   accessorKey: 'website',
      //   header: 'Website',
      // },

      // {
      //   accessorKey: 'type',
      //   header: 'Type',
      // },
      {
        accessorKey: 'startDate',
        enableSorting: true,
        header: 'Start Date',
        cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return date.toLocaleDateString();
        },
      },
      {
        accessorKey: 'endDate',
        enableSorting: true,
        header: 'End Date',
        cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return date.toLocaleDateString();
        },
      },
      {
        id: 'actions',
        header: '',
        size: 40,
        cell: ({ row }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="flex size-8 p-0 data-[state=open]:bg-muted"
                >
                  <Ellipsis className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onSelect={() => setRowAction({ row, type: 'update' })}
                >
                  Edit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
  });

  return (
    <>
      <DataTable {...table} />
      <CampaignDialog
        companyId={companyId}
        campaign={rowAction?.row?.original}
        open={rowAction?.type === 'update'}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setRowAction(undefined);
          }
        }}
      />
    </>
  );
};
