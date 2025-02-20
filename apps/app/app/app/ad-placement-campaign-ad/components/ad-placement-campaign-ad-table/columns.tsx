import {
  ADVERTISEMENT_SIZES,
  type AdPlacementCampaignAdData,
  type AdPlacementCampaignAdUpdateInput,
  type AdvertisementData,
  type CampaignData,
} from '@repo/common-types';
import type {
  ColumnDef,
  DataTableRowAction,
} from '@repo/design-system/components/custom/data-table';
import { AspectRatio } from '@repo/design-system/components/ui/aspect-ratio';
import { Button } from '@repo/design-system/components/ui/button';
import { Checkbox } from '@repo/design-system/components/ui/checkbox';
import Link from 'next/link';
import { AdvertisementSizeBadge } from '../../../advertisement/components/advertisement-size-badge';
import { AdvertisementTypeBadge } from '../../../advertisement/components/advertisement-type-badge';
import { CampaignStatusBadge } from '../../../campaign/components/campaign-status-badge';
import type { AdPlacementCampaignAdTypes } from '../ad-placement-campaign-ad-types';

type GetColumnsProps = AdPlacementCampaignAdTypes & {
  setRowAction: React.Dispatch<
    React.SetStateAction<
      DataTableRowAction<AdPlacementCampaignAdData> | undefined
    >
  >;

  update: (data: AdPlacementCampaignAdUpdateInput) => void;
};

export function getColumns({
  setRowAction,
  update,
  campaignAdId,
  adPlacementId,
}: GetColumnsProps): ColumnDef<AdPlacementCampaignAdData>[] {
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
      cell: ({ row, cell }) => {
        const val = row.original;
        const handleUpdate = (v: boolean) => {
          update({
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
    },
    {
      accessorKey: 'adPlacement.name',
      header: 'Ad Placement',
      remove: !!adPlacementId,
    },
    {
      accessorKey: 'adPlacement.description',
      header: 'Description',
      remove: !!adPlacementId,
    },
    {
      accessorKey: 'company.name',
      header: 'Company Name',
      remove: !!campaignAdId,
      cell: ({ cell, row }) => {
        const companyName = cell.getValue<string>();
        const companyId = row.original.company.id;
        return (
          <Button variant={'link'} asChild>
            <Link href={`/app/company/${companyId}`}>{companyName}</Link>
          </Button>
        );
      },
    },
    {
      accessorKey: 'campaignAd.campaign.name',
      header: 'Campaign Name',
      remove: !!campaignAdId,
      cell: ({ cell, row }) => {
        const campaignName = cell.getValue<string>();
        const companyId = row.original.campaignAd.campaign.companyId;
        const campaignId = row.original.campaignAd.campaign.id;
        return (
          <Button variant={'link'} asChild>
            <Link href={`/app/company/${companyId}/campaign/${campaignId}`}>
              {campaignName}
            </Link>
          </Button>
        );
      },
    },
    {
      accessorKey: 'campaignAd.campaign.status',
      header: 'Campaign Status',
      cell: ({ cell }) => {
        const status = cell.getValue<CampaignData['status']>();
        return <CampaignStatusBadge status={status} />;
      },
      remove: !!campaignAdId,
    },
    {
      accessorKey: 'campaignAd.weight',
      header: 'Campaign Weight',
      meta: {
        numeric: true,
      },
    },
    {
      accessorKey: 'campaignAd.ad.metadata.size',
      //   remove: ad,
      header: 'Ad Size',
      enableColumnFilter: true,
      filterFn: 'arrIncludes',
      cell: ({ cell }) => {
        const size = cell.getValue<AdvertisementData['metadata']['size']>();
        return <AdvertisementSizeBadge size={size} />;
      },
    },
    {
      accessorKey: 'campaignAd.ad.content',
      //   remove: ad,
      header: 'Ad Content',
      cell: ({ cell, row }) => {
        const content = cell.getValue<string>();
        const size =
          ADVERTISEMENT_SIZES[row.original.campaignAd.ad.metadata.size];
        return (
          <AspectRatio ratio={size.width / size.height}>
            <img src={content} alt="" />
          </AspectRatio>
        );
      },
      enableHiding: true,
      hidden: true,
    },
    {
      //   remove: ad,
      accessorKey: 'campaignAd.ad.type',
      header: 'Ad Type',
      cell: ({ cell }) => {
        const type = cell.getValue<AdvertisementData['type']>();
        return <AdvertisementTypeBadge type={type} />;
      },
    },
  ];
}
