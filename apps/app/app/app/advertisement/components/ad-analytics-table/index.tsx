'use client';

import { trpc } from '@/utils/trpc';
import { type AnalyticsType, formatDateRelative } from '@repo/common-types';
import { DataTable } from '@repo/design-system/components/custom/data-table';
import { useDataTable } from '@repo/design-system/hooks/use-datatable';
import { AdAnalyticsTypeBadge } from '../ad-analytics-type-badge';
import type { AdAnalyticsTypes } from '../ad-analytics-types';

export const AdAnalyticsTable: React.FC<AdAnalyticsTypes> = ({ companyId }) => {
  const { data, isLoading } = trpc.adAnalytics.getAll.useQuery({
    companyId,
  });

  const table = useDataTable({
    data: data || [],
    loading: isLoading,
    columns: [
      // {
      //   accessorKey: 'id',
      //   header: '',
      //   size: 40,
      //   cell: ({ cell }) => {
      //     const id = cell.getValue<string>();
      //     return (
      //       <Button variant={'ghost'} size={'icon'} asChild>
      //         <Link href={`/companies/${id}`}>
      //           <Eye />
      //         </Link>
      //       </Button>
      //     );
      //   },
      // },
      {
        accessorKey: 'ad.company.name',
        header: 'Company',
        enableHiding: true,
      },
      {
        accessorKey: 'ad.name',
        header: 'Ad Name',
      },
      {
        accessorKey: 'client.metadata.browser.name',
        header: 'Browser',
      },
      {
        accessorKey: 'client.metadata.os.name',
        header: 'OS',
      },
      {
        accessorKey: 'type',
        header: 'Type',
        enableSorting: true,
        enableColumnFilter: true,
        filterFn: 'arrIncludesSome',
        cell: ({ cell }) => {
          const type = cell.getValue<AnalyticsType>();
          return (
            <div className="flex justify-center space-x-2">
              <AdAnalyticsTypeBadge type={type} />
            </div>
          );
        },
      },
      {
        accessorKey: 'region',
        header: 'Region',
      },
      {
        accessorKey: 'timestamp',
        enableSorting: true,
        header: 'Date',
        cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return formatDateRelative(date);
        },
      },
    ],
  });

  return (
    <>
      <DataTable {...table} />
    </>
  );
};
