'use client';

import { trpc } from '@/utils/trpc';
import type { CompanyContactData } from '@repo/common-types';
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
import { Ellipsis } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { CompanyContactDialog } from '../company-contact-dialog';

export const CompanyContactTable: React.FC<{
  companyId: string;
}> = ({ companyId }) => {
  const { data } = trpc.companyContact.getAll.useQuery({
    companyId,
  });
  const [rowAction, setRowAction] = useState<
    DataTableRowAction<CompanyContactData> | undefined
  >(undefined);

  const utils = trpc.useUtils();

  const { mutate: deleteContact } = trpc.companyContact.delete.useMutation({
    onSuccess: () => {
      utils.companyContact.getAll.invalidate();
    },
  });

  const handleDelete = async (data: CompanyContactData[]) => {
    const res = await Promise.all(data.map((d) => deleteContact({ id: d.id })));
    console.log(data, res);
  };

  const table = useDataTable({
    data: data || [],

    columns: [
      // {
      //   accessorKey: "id",
      //   header: "",
      //   size: 40,
      //   cell: ({ cell }) => {
      //     const id = cell.getValue<string>();
      //     return (
      //       <Button variant={"ghost"} size={"icon"} asChild>
      //         <Link href={`/companies/${id}`}>
      //           <Eye />
      //         </Link>
      //       </Button>
      //     );
      //   },
      // },
      {
        accessorKey: 'name',
        header: 'Name',
        enableSorting: true,
      },

      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
      },

      {
        accessorKey: 'title',
        header: 'Title',
      },
      {
        accessorKey: 'department',
        header: 'Department',
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
      <CompanyContactDialog
        companyId={companyId}
        companyContact={rowAction?.row?.original}
        open={rowAction?.type === 'update'}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setRowAction(undefined);
          }
        }}
      />
      <DeleteDialog
        label="companyContact"
        handleDelete={handleDelete}
        data={rowAction?.row?.original ? [rowAction.row.original] : []}
        open={rowAction?.type === 'delete'}
        onOpenChange={() => setRowAction(undefined)}
        onSuccess={() => rowAction?.row.toggleSelected(false)}
      />
    </>
  );
};
