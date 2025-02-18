'use client';

import { trpc } from '@/utils/trpc';
import type { AdPlacementCampaignAdData } from '@repo/common-types';
import type { DataTableRowAction } from '@repo/design-system/components/custom/data-table';
import { DataTable } from '@repo/design-system/components/custom/data-table';
import { useDataTable } from '@repo/design-system/hooks/use-datatable';
import { useMemo, useState } from 'react';
import { AdPlacementCampaignAdDialog } from '../ad-placement-campaign-ad-dialog';
import type { AdPlacementCampaignAdTypes } from '../ad-placement-campaign-ad-types';
import { getColumns } from './columns';

export const AdPlacementCampaignAdTable: React.FC<
  AdPlacementCampaignAdTypes
> = (props) => {
  const { data, isLoading } = trpc.adPlacementCampaignAd.getAll.useQuery(props);
  const [rowAction, setRowAction] = useState<
    DataTableRowAction<AdPlacementCampaignAdData> | undefined
  >(undefined);

  const utils = trpc.useUtils();

  const { mutate: updateAdPlacementCampaignAd } =
    trpc.adPlacementCampaignAd.update.useMutation({
      onSuccess: () => {
        utils.adPlacementCampaignAd.getAll.invalidate();
      },
    });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const columns = useMemo(
    () =>
      getColumns({
        setRowAction,
        update: updateAdPlacementCampaignAd,
        ...props,
      }),
    []
  );
  const table = useDataTable({
    data: data || [],
    loading: isLoading,
    columns,
  });

  return (
    <>
      <DataTable {...table} />
      <AdPlacementCampaignAdDialog
        adPlacementCampaignAd={rowAction?.row?.original}
        open={rowAction?.type === 'update'}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setRowAction(undefined);
          }
        }}
        {...props}
      />
    </>
  );
};
