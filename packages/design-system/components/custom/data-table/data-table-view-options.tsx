'use client';

import { flexRender } from '@tanstack/react-table';
import { Check, ChevronsUpDown, Settings2 } from 'lucide-react';
import * as React from 'react';

import { Button } from '@repo/design-system/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@repo/design-system/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/design-system/components/ui/popover';
import { cn, toSentenceCase } from '@repo/design-system/lib/utils';
import type { Column, Header } from './types';

interface DataTableViewOptionsProps<TData> {
  //   table: Table<TData>;
  hidden?: boolean;
  viewColumns: {
    column: Column<TData, unknown>;
    header: Header<TData, unknown> | undefined;
  }[];
}

export function DataTableViewOptions<TData>({
  viewColumns,
  hidden,
}: DataTableViewOptionsProps<TData>) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  if (hidden) {
    return null;
  }

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          aria-label="Toggle columns"
          variant="outline"
          //   role="combobox"
          size="sm"
          className="ml-auto hidden h-8 gap-2 focus:outline-none focus:ring-1 focus:ring-ring focus-visible:ring-0 lg:flex"
        >
          <Settings2 className="size-4" />
          View
          <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-44 p-0"
        onCloseAutoFocus={() => triggerRef.current?.focus()}
      >
        <Command>
          <CommandInput placeholder="Search columns..." />
          <CommandList>
            <CommandEmpty>No columns found.</CommandEmpty>
            <CommandGroup>
              {viewColumns.map(({ column, header }) => {
                return (
                  <CommandItem
                    key={column.id}
                    onSelect={() =>
                      column.toggleVisibility(!column.getIsVisible())
                    }
                  >
                    <span className="truncate">
                      {/* {} */}
                      {header
                        ? flexRender(
                            column.columnDef.header,
                            header.getContext()
                          )
                        : toSentenceCase(column.id)}
                    </span>
                    <Check
                      className={cn(
                        'ml-auto size-4 shrink-0',
                        column.getIsVisible() ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
