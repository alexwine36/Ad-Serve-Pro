import { flexRender } from '@tanstack/react-table';
import type { DataTableComponentProps } from './types';

import {
  TableBody,
  TableCell,
  TableRow,
} from '@repo/design-system/components/ui/table';
import { cn } from '../../../lib/utils';
import { Skeleton } from '../../ui/skeleton';

export const DataTableBody = <TData, TValue>({
  columns,
  table,
  loading,
}: Omit<
  DataTableComponentProps<TData, TValue>,
  'selectable' | 'enablePagination'
>) => {
  if (loading) {
    const rowCount = 5;
    return (
      <TableBody>
        {Array.from({ length: rowCount }).map((_, index) => (
          <TableRow key={index}>
            {table.getVisibleFlatColumns().map((col) => {
              return (
                <TableCell key={col.id}>
                  <Skeleton className="h-6" />
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    );
  }
  return (
    <TableBody>
      {table.getRowModel().rows.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow data-state={row.getIsSelected() && 'selected'} key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                className={cn({
                  'text-right': cell.column.columnDef.meta?.numeric,
                })}
                style={{
                  maxWidth: cell.column.columnDef.maxSize,
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell className="h-24 text-center" colSpan={columns.length}>
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};
