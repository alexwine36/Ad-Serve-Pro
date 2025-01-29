'use client';

import { trpc } from '@/utils/trpc';
import type { CompanyData } from '@repo/common-types';
import type { DataTableRowAction } from '@repo/design-system/components/custom/data-table';
import { DataTable } from '@repo/design-system/components/custom/data-table';
import { DeleteDialog } from '@repo/design-system/components/custom/delete-dialog';
import { Button } from '@repo/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { useDataTable } from '@repo/design-system/hooks/use-datatable';
import { Ellipsis, Eye } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { CompanyDialog } from '../company-dialog';

export const CompanyTable = () => {
  const { data } = trpc.company.getAll.useQuery({});
  const [rowAction, setRowAction] = useState<
    DataTableRowAction<CompanyData> | undefined
  >(undefined);

  const handleDelete = async (data: CompanyData[]) => {
    const promise = new Promise((resolve, _reject) => {
      setTimeout(() => resolve('Data from promise'), 1000);
    });
    await promise;
    console.log(data);
  };

  const table = useDataTable({
    data: data || [],
    enablePagination: true,
    columns: [
      {
        accessorKey: 'id',
        header: '',
        size: 40,
        cell: ({ cell }) => {
          const id = cell.getValue<string>();
          return (
            <Button variant={'ghost'} size={'icon'} asChild>
              <Link href={`/app/company/${id}`}>
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

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setRowAction({ row, type: 'delete' })}
                >
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
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
      <CompanyDialog
        company={rowAction?.row?.original}
        open={rowAction?.type === 'update'}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setRowAction(undefined);
          }
        }}
      />
      <DeleteDialog
        label="company"
        handleDelete={handleDelete}
        data={rowAction?.row?.original ? [rowAction.row.original] : []}
        open={rowAction?.type === 'delete'}
        onOpenChange={() => setRowAction(undefined)}
        onSuccess={() => rowAction?.row.toggleSelected(false)}
      />
    </>
  );
};
