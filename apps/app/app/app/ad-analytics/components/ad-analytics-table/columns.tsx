import type { AnalyticsType } from '@prisma/client';
import {
  type ExtendedAdAnalyticsData,
  formatDateRelative,
} from '@repo/common-types';
import type { ColumnDef } from '@repo/design-system/components/custom/data-table';
import { AdAnalyticsTypeBadge } from '../ad-analytics-type-badge';

interface GetColumnsProps {
  //   setRowAction: React.Dispatch<
  //     React.SetStateAction<
  //       DataTableRowAction<ExtendedAdAnalyticsData> | undefined
  //     >
  //   >;
  companyId?: string;
  //   updateCampaignAd: (data: ExtendedAdAnalyticsData) => void;
  //   source: CampaignAdTypes['source'];
}

export function getColumns({
  // setRowAction,
  companyId,
}: GetColumnsProps): ColumnDef<ExtendedAdAnalyticsData>[] {
  return [
    {
      accessorKey: 'company.name',
      header: 'Company',
      enableHiding: true,
      enableColumnFilter: true,
      remove: !!companyId,
      filterFn: 'arrIncludesSome',
    },

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
      enableColumnFilter: true,
      filterFn: 'arrIncludesSome',
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
  ];
}
