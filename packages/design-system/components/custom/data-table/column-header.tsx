import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  DotsVerticalIcon,
  EyeNoneIcon,
} from '@radix-ui/react-icons';
import { Button } from '@repo/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { cn } from '@repo/design-system/lib/utils';
import { flexRender } from '@tanstack/react-table';
import type { Column, Header } from './types';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  header: Header<TData, TValue>;
  // title: string
}

export function DataTableColumnHeader<TData, TValue>({
  header,

  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const column = header.column;

  const {
    enableSorting: sortable,
    enableHiding: hideable,
    enableColumnFilter: filterable,
  } = column.columnDef;
  const facets = column.getFacetedUniqueValues();

  if ((hideable || sortable || filterable) && column.getCanSort()) {
    return (
      <div
        className={cn(
          'flex items-center space-x-2',
          column.columnDef.numeric && 'justify-end',
          filterable && 'justify-between',
          className
        )}
      >
        {hideable || sortable ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="-ml-3 h-8 data-[state=open]:bg-accent"
                size="sm"
                variant="ghost"
              >
                <span>
                  {flexRender(column.columnDef.header, header.getContext())}
                </span>
                {/* eslint-disable-next-line no-nested-ternary -- It's fine for now */}
                {column.getIsSorted() === 'desc' ? (
                  <ArrowDownIcon className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === 'asc' ? (
                  <ArrowUpIcon className="ml-2 h-4 w-4" />
                ) : (
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() => {
                  column.toggleSorting(false);
                }}
              >
                <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  column.toggleSorting(true);
                }}
              >
                <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Desc
              </DropdownMenuItem>
              {hideable ? (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      column.toggleVisibility(false);
                    }}
                  >
                    <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    Hide
                  </DropdownMenuItem>
                </>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className={cn(className)}>
            {flexRender(column.columnDef.header, header.getContext())}
          </div>
        )}

        {filterable ? (
          <Filter
            column={column}
            facets={Array.from(facets, ([name, value]) => ({ name, value }))}
          />
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn(className)}>
      {flexRender(column.columnDef.header, header.getContext())}
    </div>
  );
}

function Filter<TData, TValue>({
  column,
  facets,
}: {
  facets: {
    name: string;
    value: number;
  }[];
  column: Column<TData, TValue>;
}) {
  const columnFilterValue = column.getFilterValue();

  const isChecked = (name: string) => {
    let checked = false;
    if (Array.isArray(columnFilterValue)) {
      checked = columnFilterValue.includes(name);
    }

    return checked;
  };

  const handleCheck = (name: string) => {
    if (Array.isArray(columnFilterValue)) {
      if (columnFilterValue.includes(name)) {
        column.setFilterValue(columnFilterValue.filter((n) => n !== name));
      } else {
        column.setFilterValue([...columnFilterValue, name]);
      }
    } else {
      column.setFilterValue([name]);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="-ml-3 h-8 data-[state=open]:bg-accent"
          size="sm"
          variant="ghost"
        >
          <DotsVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-screen overflow-scroll">
        {facets.map((facet) => (
          <DropdownMenuCheckboxItem
            // checked={showStatusBar}
            key={facet.name}
            checked={isChecked(facet.name)}
            // onCheckedChange={setShowStatusBar}
            onCheckedChange={() => {
              // column.setFilterValue([facet.value]);
              handleCheck(facet.name);
            }}
          >
            {facet.name}
          </DropdownMenuCheckboxItem>

          // <DropdownMenuItem className="flex space-x-2" key={facet.value}>
          //   <Checkbox />
          //   <Label>{facet.name}</Label>
          //   {/* {facet.name} */}
          // </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
