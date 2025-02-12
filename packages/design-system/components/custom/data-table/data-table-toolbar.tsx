'use client';
import { X } from 'lucide-react';
import * as React from 'react';

import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { cn } from '@repo/design-system/lib/utils';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';
import type { UseDataTableReturn } from './types';

interface DataTableToolbarProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<UseDataTableReturn<TData, TValue>, 'table' | 'displayIfEmpty'> {}

export function DataTableToolbar<TData, TValue>({
  table,
  //   filterFields = [],
  children,
  className,
  displayIfEmpty,
  ...props
}: DataTableToolbarProps<TData, TValue>) {
  const filterFields = React.useMemo(() => {
    return table
      .getAllColumns()
      .filter((column) => column.columnDef.enableColumnFilter)
      .map((column) => {
        const header = table.getFlatHeaders().find((h) => h.id === column.id);
        return { column, header };
      });
  }, [table]);

  const viewColumns = React.useMemo(() => {
    const headers = table.getFlatHeaders();
    const res = table
      .getAllColumns()
      .filter(
        (column) =>
          typeof column.accessorFn !== 'undefined' &&
          column.getCanHide() &&
          column.columnDef.enableHiding
      )
      .map((column) => {
        const header = headers.find((header) => header.id === column.id);
        return {
          column,
          header,
        };
      });
    return res;
  }, [table]);

  const isFiltered = table.getState().columnFilters.length > 0;

  // Memoize computation of searchableColumns and filterableColumns
  const { searchableColumns, filterableColumns } = React.useMemo(() => {
    return {
      searchableColumns: filterFields.filter((_field) => false),
      filterableColumns: filterFields.filter((_field) => true),
    };
  }, [filterFields]);

  if (
    !searchableColumns.length &&
    !filterableColumns.length &&
    !children &&
    !viewColumns.length
  ) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between gap-2 overflow-auto p-1',
        className
      )}
      {...props}
    >
      <div className="flex flex-1 items-center gap-2">
        {searchableColumns.length > 0 &&
          searchableColumns.map((field) => {
            const column = field.column;
            return (
              table.getColumn(column.id ? String(column.id) : '') && (
                <Input
                  key={String(column.id)}
                  //   placeholder={column.placeholder}
                  value={
                    (table
                      .getColumn(String(column.id))
                      ?.getFilterValue() as string) ?? ''
                  }
                  onChange={(event) =>
                    table
                      .getColumn(String(column.id))
                      ?.setFilterValue(event.target.value)
                  }
                  className="h-8 w-40 lg:w-64"
                />
              )
            );
          })}
        {filterableColumns.length > 0 &&
          filterableColumns.map(
            ({ column, header }) =>
              table.getColumn(column.id ? String(column.id) : '') && (
                <DataTableFacetedFilter
                  key={String(column.id)}
                  header={header}
                  column={table.getColumn(column.id ? String(column.id) : '')}
                  //   title={column.label}
                  //   options={column.options ?? []}
                />
              )
          )}
        {isFiltered && (
          <Button
            aria-label="Reset filters"
            variant="ghost"
            className="h-8 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <X className="ml-2 size-4" aria-hidden="true" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {children}

        <DataTableViewOptions
          hidden={!displayIfEmpty && !viewColumns.length}
          viewColumns={viewColumns}
        />
      </div>
    </div>
  );
}
