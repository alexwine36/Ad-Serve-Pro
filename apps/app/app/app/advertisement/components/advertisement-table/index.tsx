'use client';

import { trpc } from '@/utils/trpc';
import type {
  AdvertisementCampaignCounts,
  AdvertisementData,
} from '@repo/common-types';
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
import { BooleanTableDisplay } from '../../../components/boolean-table-display';
import { AdvertisementDialog } from '../advertisement-dialog';
import { AdvertisementSizeBadge } from '../advertisement-size-badge';
import { AdvertisementTypeBadge } from '../advertisement-type-badge';
import type { AdvertisementTypes } from '../advertisement-types';
import { AdvertisementCampaignCountsDisplay } from '../advertisment-campaign-counts-display';

export const AdvertisementTable: React.FC<AdvertisementTypes> = ({
  companyId,
}) => {
  const { data, isLoading } = trpc.advertisement.getAll.useQuery({
    companyId,
  });

  const [rowAction, setRowAction] = useState<
    DataTableRowAction<AdvertisementData> | undefined
  >(undefined);

  console.log(data);

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
              <Link href={`/companies/${id}`}>
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
        accessorKey: 'metadata.size',
        header: 'Size',
        cell: ({ cell }) => {
          const size = cell.getValue<AdvertisementData['metadata']['size']>();
          return <AdvertisementSizeBadge size={size} />;
        },
      },
      {
        accessorKey: 'content',
        header: 'Content',
        cell: ({ cell }) => {
          const content = cell.getValue<string>();
          return (
            <div>
              <img src={content} alt="" />
            </div>
          );
        },
      },

      {
        accessorKey: 'isActive',
        header: 'Active',
        cell: ({ cell }) => {
          const isActive = cell.getValue<boolean>();
          return <BooleanTableDisplay value={isActive} />;
        },
      },

      {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ cell }) => {
          const type = cell.getValue<AdvertisementData['type']>();
          return <AdvertisementTypeBadge type={type} />;
        },
      },
      {
        accessorKey: 'createdAt',
        enableSorting: true,
        header: 'Created At',
        cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return date.toLocaleDateString();
        },
      },
      {
        accessorKey: 'campaignCounts',
        header: 'Active Campaigns',
        cell: ({ cell }) => {
          const count = cell.getValue<AdvertisementCampaignCounts>();
          return <AdvertisementCampaignCountsDisplay campaignCounts={count} />;
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
      <AdvertisementDialog
        companyId={companyId}
        advertisement={rowAction?.row?.original}
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
