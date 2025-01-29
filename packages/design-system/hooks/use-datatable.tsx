import { useMemo, useState } from "react";

import type { DataTableProps, UseDataTableReturn } from "@repo/design-system/components/custom/data-table/types";
import { Checkbox } from "@repo/design-system/components/ui/checkbox";

import type {
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';

export const useDataTable = <TData, TValue>({
  columns: initColumns,
  data,
  selectable,
  enablePagination,
}: DataTableProps<TData, TValue>): UseDataTableReturn<TData, TValue> => {

 const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const columns = useMemo(() => {
    if (selectable) {
      return [
        {
          id: "select",
          header: ({ table }) => (
            <Checkbox
              aria-label="Select all"
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) => {
                table.toggleAllPageRowsSelected(Boolean(value));
              }}
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              aria-label="Select row"
              checked={row.getIsSelected()}
              onCheckedChange={(value) => {
                row.toggleSelected(Boolean(value));
              }}
            />
          ),
          enableSorting: false,
          enableHiding: false,
        },
        ...initColumns,
      ];
    }
    return initColumns;
  }, [initColumns, selectable]);


  const selectedRows = useMemo(() => {
    return data.filter((_row, idx) => rowSelection[idx]); 
  }, [data, rowSelection]);


  return {
    columns,
    data,
    enablePagination: enablePagination || false,
    selectable: selectable || false,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    columnVisibility,
    setColumnVisibility,
    rowSelection,
    setRowSelection,
    selectedRows
  };
};
