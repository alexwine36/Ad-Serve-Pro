import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/design-system/components/ui/table';
import { DataTableColumnHeader } from './column-header';
import { DataTableBody } from './data-table-body';
import { DataTablePagination } from './pagination';
import type { DataTableComponentProps } from './types';

// TODO: Improve functionality of DataTable
// https://github.com/sadmann7/shadcn-table/tree/main

export function DataTableComponent<TData, TValue>({
  columns,
  selectable,
  enablePagination,
  loading,
  table,
}: DataTableComponentProps<TData, TValue>) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{
                      maxWidth: header.column.columnDef.maxSize,
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <DataTableColumnHeader header={header} />
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <DataTableBody columns={columns} table={table} loading={loading} />
      </Table>
      {enablePagination && !loading ? (
        <DataTablePagination selectable={selectable} table={table} />
      ) : null}
    </div>
  );
}
