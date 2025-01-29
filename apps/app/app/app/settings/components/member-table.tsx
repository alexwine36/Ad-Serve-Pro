'use client';

import {
  DataTable,
  type DataTableRowAction,
} from '@repo/design-system/components/custom/data-table';
import { useDataTable } from '@repo/design-system/hooks/use-datatable';

import { Button } from '@repo/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import type { MemberGetAllResponse } from '@repo/trpc';
import { Ellipsis } from 'lucide-react';
import React from 'react';
import { trpc } from '../../../../utils/trpc';
export const MemberTable = () => {
  const { data } = trpc.member.getAll.useQuery({});
  const [rowAction, setRowAction] = React.useState<DataTableRowAction<
    MemberGetAllResponse[0]
  > | null>(null);
  const table = useDataTable({
    selectable: true,
    columns: [
      {
        accessorKey: 'name',
        header: 'Name',
        enableSorting: true,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        enableSorting: true,
      },

      {
        accessorKey: 'role',
        header: 'Role',
        enableColumnFilter: true,
        filterFn: 'arrIncludesSome',
      },
      // {
      //   accessorKey: 'title',
      //   header: 'Title',
      //   enableSorting: true,
      // },
      {
        id: 'actions',
        header: '',
        size: 40,
        // accessorFn(row) {
        //   return `${row.email}-${row.email}`;
        // },
        cell: ({ row }) => {
          // const email = row.getValue<string>('email');
          // console.log(email);
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
                {/* <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup
                      value={row.original.label}
                      onValueChange={(value) => {
                        startUpdateTransition(() => {
                          toast.promise(
                            updateTask({
                              id: row.original.id,
                              label: value as Task['label'],
                            }),
                            {
                              loading: 'Updating...',
                              success: 'Label updated',
                              error: (err) => getErrorMessage(err),
                            }
                          );
                        });
                      }}
                    >
                      {tasks.label.enumValues.map((label) => (
                        <DropdownMenuRadioItem
                          key={label}
                          value={label}
                          className="capitalize"
                          disabled={isUpdatePending}
                        >
                          {label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub> */}
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
          // return <a href={`/programs/${value}`}>View</a>;
        },
      },
    ],
    data: data || [],
  });

  // console.log(table.selectedRows);

  return <DataTable {...table} />;
};
