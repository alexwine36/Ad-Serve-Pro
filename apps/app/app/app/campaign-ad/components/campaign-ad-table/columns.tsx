import type { AdvertisementData, CampaignData } from '@repo/common-types';
import type {
  ColumnDef,
  DataTableRowAction,
} from '@repo/design-system/components/custom/data-table';
import { Button } from '@repo/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';
import { Checkbox } from '../../../../../../../packages/design-system/components/ui/checkbox';
import type { CampaignAdGetAllResponse } from '../../../../../../../packages/trpc/src/server/routers/campaign-ad/campaign-ad-get-all-handler';
import type { CampaignAdUpdateSchema } from '../../../../../../../packages/trpc/src/server/routers/campaign-ad/campaign-ad-update-schema';
import { AdvertisementSizeBadge } from '../../../advertisement/components/advertisement-size-badge';
import { AdvertisementTypeBadge } from '../../../advertisement/components/advertisement-type-badge';
import { CampaignStatusBadge } from '../../../campaign/components/campaign-status-badge';
import type { CampaignAdTypes } from '../campaign-ad-types';

interface GetColumnsProps {
  setRowAction: React.Dispatch<
    React.SetStateAction<
      DataTableRowAction<CampaignAdGetAllResponse[0]> | undefined
    >
  >;
  updateCampaignAd: (data: CampaignAdUpdateSchema) => void;
  source: CampaignAdTypes['source'];
}

export function getColumns({
  setRowAction,
  source,
  updateCampaignAd,
}: GetColumnsProps): ColumnDef<CampaignAdGetAllResponse[0]>[] {
  const ad = source === 'ADVERTISEMENT';
  const campaign = source === 'CAMPAIGN';
  return [
    {
      enableColumnFilter: true,
      filterFn: (r, id, filterValue) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const row = r.original as any;

        if (id in row) {
          return filterValue.includes(row[id]);
        }
        return false;
      },
      accessorKey: 'isActive',
      header: 'Active',
      //   maxSize: 50,
      // center: true,
      cell: ({ row, cell }) => {
        const val = row.original;
        const handleUpdate = (v: boolean) => {
          updateCampaignAd({
            ...val,
            isActive: v,
          });
        };
        const value = cell.getValue<boolean>();
        return (
          <div className="ml-4 flex">
            <Checkbox checked={value} onCheckedChange={handleUpdate} />
          </div>
        );
      },
      // enableHiding: true,
    },
    {
      accessorKey: 'campaign.name',
      header: 'Campaign Name',
      enableSorting: true,
      remove: campaign,
    },
    {
      accessorKey: 'ad.name',
      header: 'Advertisement Name',
      enableSorting: true,
      remove: ad,
    },
    {
      accessorKey: 'ad.metadata.size',
      remove: ad,
      header: 'Size',
      enableColumnFilter: true,
      filterFn: 'arrIncludes',
      cell: ({ cell }) => {
        const size = cell.getValue<AdvertisementData['metadata']['size']>();
        return <AdvertisementSizeBadge size={size} />;
      },
    },
    {
      accessorKey: 'ad.content',
      remove: ad,
      header: 'Content',
      cell: ({ cell }) => {
        const content = cell.getValue<string>();
        return (
          <div>
            <img src={content} alt="" />
          </div>
        );
      },
    },
    {
      remove: ad,
      accessorKey: 'ad.type',
      header: 'Type',
      cell: ({ cell }) => {
        const type = cell.getValue<AdvertisementData['type']>();
        return <AdvertisementTypeBadge type={type} />;
      },
    },
    {
      accessorKey: 'campaign.status',
      header: 'Status',
      cell: ({ cell }) => {
        const status = cell.getValue<CampaignData['status']>();
        return <CampaignStatusBadge status={status} />;
      },
      remove: campaign,
    },

    {
      accessorKey: 'weight',
      header: 'Weight',
      meta: {
        numeric: true,
      },
    },

    {
      accessorKey: 'createdAt',
      enableSorting: true,
      header: 'Created At',
      cell: ({ cell }) => {
        const date = cell.getValue<Date>();
        return date.toLocaleDateString();
      },
    },
    {
      id: 'actions',
      header: '',
      maxSize: 40,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex size-8 p-0 data-[state=open]:bg-muted"
              >
                <Ellipsis className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, type: 'update' })}
              >
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
