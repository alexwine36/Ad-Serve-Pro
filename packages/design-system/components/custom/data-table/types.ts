import type {
  ColumnFiltersState,
  Column as OrigColumn,
  ColumnDef as OrigColumnDef,
  Header as OrigHeader,
  Row,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import type { Dispatch, SetStateAction } from 'react';

export type ColumnDef<TData, TValue> = OrigColumnDef<TData, TValue> & {
  //   sortable?: boolean;
  numeric?: boolean;

  //   hideable?: boolean;
};

export type Column<TData, TValue> = Omit<
  OrigColumn<TData, TValue>,
  'columnDef'
> & {
  columnDef: ColumnDef<TData, TValue>;
};

export type Header<TData, TValue> = Omit<
  OrigHeader<TData, TValue>,
  'column'
> & {
  column: Column<TData, TValue>;
};

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  enablePagination?: boolean;
  selectable?: boolean;
}

// type TableComponentType<TData, TValue> = Omit<
//   DataTableProps<TData, TValue>,
//   "data"
// >;

export interface TableComponentType<TData, TValue>
  extends DataTableProps<TData, TValue> {
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  columnFilters: ColumnFiltersState;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
  columnVisibility: VisibilityState;
  setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>;
  rowSelection: RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
  selectedRows: TData[];
}
export type UseDataTableReturn<TData, TValue> = Required<
  TableComponentType<TData, TValue>
>;

export type DataTableRowAction<TData> = {
  row: Row<TData>;
  type: 'update' | 'delete';
};
