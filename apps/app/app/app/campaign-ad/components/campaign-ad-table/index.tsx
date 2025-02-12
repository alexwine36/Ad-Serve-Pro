'use client';

import { trpc } from '@/utils/trpc';
import type { DataTableRowAction } from '@repo/design-system/components/custom/data-table';
import { DataTable } from '@repo/design-system/components/custom/data-table';
import { useDataTable } from '@repo/design-system/hooks/use-datatable';
import { useMemo, useState } from 'react';
import type { CampaignAdGetAllResponse } from '../../../../../../../packages/trpc/src/server/routers/campaign-ad/campaign-ad-get-all-handler';
import { CampaignAdDialog } from '../campaign-ad-dialog';
import type { CampaignAdTypes } from '../campaign-ad-types';
import { getColumns } from './columns';

export const CampaignAdTable: React.FC<CampaignAdTypes> = (props) => {
  const { data, isLoading } = trpc.campaignAd.getAll.useQuery(props);
  const utils = trpc.useUtils();

  const { mutate: updateCampaignAd } = trpc.campaignAd.update.useMutation({
    onSuccess: () => {
      utils.campaignAd.getAll.invalidate();
    },
  });

  const [rowAction, setRowAction] = useState<
    DataTableRowAction<CampaignAdGetAllResponse[0]> | undefined
  >(undefined);
  const { source } = props;
  // biome-ignore lint/correctness/useExhaustiveDependencies: Don't want to re-run this effect when functions run
  const columns = useMemo(
    () => getColumns({ setRowAction, source, updateCampaignAd }),
    [source]
  );

  const table = useDataTable({
    data: data || [],
    loading: isLoading,
    columns,
  });

  return (
    <>
      <DataTable {...table} />
      <CampaignAdDialog
        campaignAd={rowAction?.row?.original}
        open={rowAction?.type === 'update'}
        {...props}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setRowAction(undefined);
          }
        }}
      />
    </>
  );
};
