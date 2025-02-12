import { useMemo, useState } from "react";

import type { DataTableProps, UseDataTableReturn } from "@repo/design-system/components/custom/data-table/types";
import { Checkbox } from "@repo/design-system/components/ui/checkbox";

import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState
} from '@tanstack/react-table';
// import { getFacetedUniqueValues } from "../components/custom/data-table/utils/get-faceted-values";

export const useDataTable = <TData, TValue>({
  columns: initColumns,
  data,
  selectable,
  enablePagination,
  loading,
  hideToolbar = false,
  displayIfEmpty = false,
}: DataTableProps<TData, TValue>): UseDataTableReturn<TData, TValue> => {

 const defaultVisibility = initColumns.reduce<VisibilityState>((acc, column) => {
    if ("accessorKey" in column && typeof column.accessorKey === "string") {
      const id = column.id || column.accessorKey.split(".").join("_");
      if (column.hidden) {
        acc[id] = !column.hidden
      }
    }
    
    return acc;
  }, {});

 const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(defaultVisibility);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

// useEffect(() => {
//     if (initColumns) {
//       const defaultColumnVisibility = initColumns.reduce<{
//         [key: string]: boolean;
//       }>((acc, column) => {
//         console.log(column.id, column.hidden)
//         if (column.hidden && column.id) {
//           acc[column.id] = !column.hidden;
//         }
    
//         return acc;
//       }, {});
//       setColumnVisibility(defaultColumnVisibility);
//     }
  
// }, [initColumns])


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
    
    return initColumns.filter((col) => !col.remove);
  }, [initColumns, selectable]);


  const selectedRows = useMemo(() => {
    return data.filter((_row, idx) => rowSelection[idx]); 
  }, [data, rowSelection]);


  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),

    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    ...(enablePagination
      ? {
          getPaginationRowModel: getPaginationRowModel(),
        }
      : {}),
  });

  return {
    // table,
    // columns,
    // // data,
    // enablePagination: enablePagination || false,
    // selectable: selectable || false,
    // sorting,
    // setSorting,
    // columnFilters,
    // setColumnFilters,
    // columnVisibility,
    // setColumnVisibility,
    // rowSelection,
    // setRowSelection,
    hideToolbar,
    displayIfEmpty,
    loading: loading || false,
    selectedRows,
    table,
    columns,
    selectable: selectable || false,
    enablePagination: enablePagination || false,
  };
};
