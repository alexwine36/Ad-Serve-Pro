import { DataTableComponent } from './component';
import { DataTableToolbar } from './data-table-toolbar';
import type { UseDataTableReturn } from './types';

type DataTableProps<TData, TValue> = UseDataTableReturn<TData, TValue> & {};

export function DataTable<TData, TValue>({
  columns,
  selectable,
  enablePagination,
  table,
  loading,
  hideToolbar,
  displayIfEmpty,
}: DataTableProps<TData, TValue>) {
  const toolbarHide = loading || hideToolbar;
  return (
    <div className="flex flex-col gap-2">
      {!toolbarHide && (
        <DataTableToolbar displayIfEmpty={displayIfEmpty} table={table} />
      )}

      <DataTableComponent
        loading={loading}
        columns={columns}
        selectable={selectable}
        enablePagination={enablePagination}
        table={table}
      />
    </div>
  );
}
