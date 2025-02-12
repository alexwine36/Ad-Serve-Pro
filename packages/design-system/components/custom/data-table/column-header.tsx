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
import { cn, toSentenceCase } from '@repo/design-system/lib/utils';
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
  let facets = new Map<unknown, number>();
  if (column.getCanFilter()) {
    facets = column?.getFacetedUniqueValues();
  }

  if ((hideable || sortable || filterable) && column.getCanSort()) {
    return (
      <div
        className={cn(
          'flex items-center space-x-2',
          column.columnDef.meta?.numeric && 'justify-end',
          column.columnDef.center && 'justify-center',
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
            facets={Array.from(facets, ([value, count]) => ({
              value,
              label: toSentenceCase(String(value)),
              count,
            }))}
          />
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center space-x-2',
        column.columnDef.meta?.numeric && 'justify-end',
        column.columnDef.center && 'justify-center',
        filterable && 'justify-between',
        className
      )}
    >
      {flexRender(column.columnDef.header, header.getContext())}
    </div>
  );
}

function Filter<TData, TValue>({
  column,
  facets,
}: {
  facets: {
    label: string;
    value: unknown;
    count: number;
  }[];
  column: Column<TData, TValue>;
}) {
  const columnFilterValue = column.getFilterValue();

  const isChecked = (value: unknown) => {
    let checked = false;
    if (Array.isArray(columnFilterValue)) {
      checked = columnFilterValue.includes(value);
    }

    return checked;
  };

  const handleCheck = (value: unknown) => {
    if (Array.isArray(columnFilterValue)) {
      if (columnFilterValue.includes(value)) {
        column.setFilterValue(columnFilterValue.filter((n) => n !== value));
      } else {
        column.setFilterValue([...columnFilterValue, value]);
      }
    } else {
      column.setFilterValue([value]);
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
            key={facet.label}
            checked={isChecked(facet.value)}
            // onCheckedChange={setShowStatusBar}
            onCheckedChange={() => {
              // column.setFilterValue([facet.value]);
              handleCheck(facet.value);
            }}
          >
            {facet.label}
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
