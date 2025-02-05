'use client';

import { DataTable } from '@repo/design-system/components/custom/data-table';
import { Button } from '@repo/design-system/components/ui/button';
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuSeparator,
DropdownMenuShortcut,
DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { DeleteDialog } from '@repo/design-system/components/custom/delete-dialog';
import { useDataTable } from '@repo/design-system/hooks/use-datatable';
import { Ellipsis, Eye } from 'lucide-react';
import Link from 'next/link';
import { trpc } from '@/utils/trpc';
import { AdAnalyticsDialog } from '../ad-analytics-dialog';
import type { DataTableRowAction } from '@repo/design-system/components/custom/data-table';
import { useState } from 'react';
import type { AdAnalyticsData } from '@repo/common-types';
import { AdAnalyticsTypes } from '../ad-analytics-types';

export const AdAnalyticsTable: React.FC<AdAnalyticsTypes> = () => {
  const { data } = trpc.adAnalytics.getAll.useQuery({});
  const [rowAction, setRowAction] = useState< DataTableRowAction<AdAnalyticsData> | undefined
    >(undefined);



    const table = useDataTable({
    data: data || [],

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
      accessorKey: 'slug',
      header: 'Slug',
      cell: ({ cell }) => {
      const slug = cell.getValue<string>();
        return <code>/{slug}</code>;
        },
        },
        {
        accessorKey: 'description',
        header: 'Description',
        },
        {
        accessorKey: 'website',
        header: 'Website',
        },

        {
        accessorKey: 'type',
        header: 'Type',
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
          id: 'actions',
          header: '',
          size: 40,
          cell: ({ row }) => {

          return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-label="Open menu" variant="ghost" className="flex size-8 p-0 data-[state=open]:bg-muted">
                <Ellipsis className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
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
            <AdAnalyticsDialog adAnalytics={rowAction?.row?.original} open={rowAction?.type==='update'
              } onOpenChange={(isOpen)=> {
              if (!isOpen) {
              setRowAction(undefined);
              }
              }}
              />
          </>
          );
          };