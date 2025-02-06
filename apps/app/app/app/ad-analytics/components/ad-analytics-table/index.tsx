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
      ...(companyId
        ? []
        : [
            {
              accessorKey: 'ad.company.name',
              header: 'Company',
              enableHiding: true,
              enableColumnFilter: true,
              // biome-ignore lint/suspicious/noExplicitAny: FilterFn not exported
              filterFn: 'arrIncludesSome' as any,
            },
          ]),
      {
        accessorKey: 'ad.name',
        header: 'Ad Name',
      },

      {
        accessorKey: 'region',
        header: 'Region',
        enableColumnFilter: true,
        filterFn: 'arrIncludesSome',
      },
      {
        accessorKey: 'city',
        header: 'City',
        enableColumnFilter: true,
        filterFn: 'arrIncludesSome',
      },
      {
        accessorKey: 'country',
        header: 'Country',
        // enableColumnFilter: true,
        // filterFn: 'arrIncludesSome',
        enableHiding: true,
        hidden: true,
      },
      {
        accessorKey: 'client.metadata.browser.name',
        header: 'Browser',
        enableHiding: true,
        hidden: true,
      },
      {
        accessorKey: 'client.metadata.os.name',
        header: 'OS',
        enableHiding: true,
        hidden: true,
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
