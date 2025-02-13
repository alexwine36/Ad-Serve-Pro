'use client';

import { trpc } from '@/utils/trpc';
import { DataTable } from '@repo/design-system/components/custom/data-table';
import { useDataTable } from '@repo/design-system/hooks/use-datatable';
import { useMemo } from 'react';
import type { AdAnalyticsTypes } from '../ad-analytics-types';
import { getColumns } from './columns';

export const AdAnalyticsTable: React.FC<AdAnalyticsTypes> = ({ companyId }) => {
  const { data, isLoading } = trpc.adAnalytics.getAll.useQuery({
    companyId,
  });
  const columns = useMemo(() => getColumns({ companyId }), [companyId]);
  const table = useDataTable({
    data: data || [],
    loading: isLoading,
    columns,
  });

  return (
    <>
      <DataTable {...table} />
    </>
  );
};
