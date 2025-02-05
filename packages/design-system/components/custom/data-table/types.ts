import type {
  Column as OrigColumn,
  ColumnDef as OrigColumnDef,
  Header as OrigHeader,
  Row,
  Table,
} from '@tanstack/react-table';
import type { DataTableConfig } from './config';

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
  loading?: boolean;
  hideToolbar?: boolean;
  displayIfEmpty?: boolean;
}

// type TableComponentType<TData, TValue> = Omit<
//   DataTableProps<TData, TValue>,
//   "data"
// >;

export interface TableComponentType<TData, TValue>
  extends Omit<DataTableProps<TData, TValue>, 'data'> {
  table: Table<TData>;
  // sorting: SortingState;
  // setSorting: Dispatch<SetStateAction<SortingState>>;
  // columnFilters: ColumnFiltersState;
  // setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
  // columnVisibility: VisibilityState;
  // setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>;
  // rowSelection: RowSelectionState;
  // setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
  selectedRows: TData[];
}
export type UseDataTableReturn<TData, TValue> = Required<
  TableComponentType<TData, TValue>
>;

export type DataTableComponentProps<TData, TValue> = Omit<
  UseDataTableReturn<TData, TValue>,
  'selectedRows' | 'hideToolbar' | 'displayIfEmpty'
>;

export type DataTableRowAction<TData> = {
  row: Row<TData>;
  type: 'update' | 'delete';
};

export type StringKeyOf<TData> = Extract<keyof TData, string>;

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  count?: number;
}

export type ColumnType = DataTableConfig['columnTypes'][number];

export interface DataTableFilterField<TData> {
  id: StringKeyOf<TData>;
  label: string;
  placeholder?: string;
  options?: Option[];
}

export interface DataTableAdvancedFilterField<TData>
  extends DataTableFilterField<TData> {
  type: ColumnType;
}
