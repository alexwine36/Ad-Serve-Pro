"use client";

import { trpc } from "@/utils/trpc";
import type { MemberData } from "@repo/common-types";
import type { DataTableRowAction } from "@repo/design-system/components/custom/data-table";
import { DataTable } from "@repo/design-system/components/custom/data-table";
import { DeleteDialog } from "@repo/design-system/components/custom/delete-dialog";
import { Button } from "@repo/design-system/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@repo/design-system/components/ui/dropdown-menu";
import { useDataTable } from "@repo/design-system/hooks/use-datatable";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { MemberDialog } from "../member-dialog";

export const MemberTable = () => {
  const { data } = trpc.member.getAll.useQuery({});
  const [rowAction, setRowAction] = useState<
    DataTableRowAction<MemberData> | undefined
  >(undefined);

  const handleDelete = async (data: MemberData[]) => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("Data from promise"), 1000);
    });
    await promise;
    console.log(data);
  };

  const table = useDataTable({
    data: data || [],

    columns: [
      {
        accessorKey: "name",
        header: "Name",
        enableSorting: true,
      },
      {
        accessorKey: "email",
        header: "Email",
        enableSorting: true,
      },
      {
        accessorKey: "active",
        header: "Active",

        cell: ({ cell }) => {
          const value = cell.getValue<boolean>();
          return (
            <div>
              {value ? (
                <span className="text-green-500">Active</span>
              ) : (
                <span className="text-red-500">Inactive</span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "role",
        header: "Role",
        enableColumnFilter: true,
        filterFn: "arrIncludesSome",
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "description",
        header: "Description",
      },

      {
        accessorKey: "createdAt",
        enableSorting: true,
        header: "Created At",
        cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return date.toLocaleDateString();
        },
      },
      {
        id: "actions",
        header: "",
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
                  onSelect={() => setRowAction({ row, type: "update" })}
                >
                  Edit
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setRowAction({ row, type: "delete" })}
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
      <MemberDialog
        member={rowAction?.row?.original}
        open={rowAction?.type === "update"}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setRowAction(undefined);
          }
        }}
      />
      <DeleteDialog
        label="member"
        handleDelete={handleDelete}
        data={rowAction?.row?.original ? [rowAction.row.original] : []}
        open={rowAction?.type === "delete"}
        onOpenChange={() => setRowAction(undefined)}
        onSuccess={() => rowAction?.row.toggleSelected(false)}
      />
    </>
  );
};
