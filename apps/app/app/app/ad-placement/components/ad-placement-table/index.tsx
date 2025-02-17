'use client';

import { trpc } from '@/utils/trpc';
import type { AdPlacementData } from '@repo/common-types';
import type { DataTableRowAction } from '@repo/design-system/components/custom/data-table';
import { DataTable } from '@repo/design-system/components/custom/data-table';
import { DeleteDialog } from '@repo/design-system/components/custom/delete-dialog';
import { useDataTable } from '@repo/design-system/hooks/use-datatable';
import { useMemo, useState } from 'react';
import { AdPlacementDialog } from '../ad-placement-dialog';
import type { AdPlacementTypes } from '../ad-placement-types';
import { getColumns } from './columns';

export const AdPlacementTable: React.FC<AdPlacementTypes> = (props) => {
  const { data, isLoading } = trpc.adPlacement.getAll.useQuery({});
  const [rowAction, setRowAction] = useState<
    DataTableRowAction<AdPlacementData> | undefined
  >(undefined);
  const utils = trpc.useUtils();
  const { mutate: deleteAdPlacement } = trpc.adPlacement.delete.useMutation({
    onSuccess: () => {
      utils.adPlacement.getAll.invalidate();
    },
  });

  const handleDelete = async (data: AdPlacementData[]) => {
    const res = await Promise.all(
      data.map((d) => deleteAdPlacement({ id: d.id }))
    );
  };

  const columns = useMemo(() => getColumns({ setRowAction }), []);
  const table = useDataTable({
    data: data || [],
    loading: isLoading,
    columns,
  });

  return (
    <>
      <DataTable {...table} />
      <AdPlacementDialog
        adPlacement={rowAction?.row?.original}
        open={rowAction?.type === 'update'}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setRowAction(undefined);
          }
        }}
        {...props}
      />
      <DeleteDialog
        label="adPlacement"
        handleDelete={handleDelete}
        data={rowAction?.row?.original ? [rowAction.row.original] : []}
        open={rowAction?.type === 'delete'}
        onOpenChange={() => setRowAction(undefined)}
        onSuccess={() => rowAction?.row.toggleSelected(false)}
      />
    </>
  );
};
