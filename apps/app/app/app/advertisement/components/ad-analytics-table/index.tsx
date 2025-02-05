'use client';

import { trpc } from '@/utils/trpc';
import { DataTable } from '@repo/design-system/components/custom/data-table';
import { Button } from '@repo/design-system/components/ui/button';
import { useDataTable } from '@repo/design-system/hooks/use-datatable';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import type { AdAnalyticsTypes } from '../ad-analytics-types';

export const AdAnalyticsTable: React.FC<AdAnalyticsTypes> = ({
  companyId,
  organizationId,
}) => {
  const { data } = trpc.adAnalytics.getAll.useQuery({
    companyId,
    organizationId,
  });

  const table = useDataTable({
    data: data || [],

    columns: [
      {
        accessorKey: 'id',
        header: '',
        size: 40,
        cell: ({ cell }) => {
          const id = cell.getValue<string>();
          return (
            <Button variant={'ghost'} size={'icon'} asChild>
              <Link href={`/companies/${id}`}>
                <Eye />
              </Link>
            </Button>
          );
        },
      },
      {
        accessorKey: 'name',
        header: 'Name',
        enableSorting: true,
      },
      {
        accessorKey: 'slug',
        header: 'Slug',
        cell: ({ cell }) => {
          const slug = cell.getValue<string>();
          return <code>/{slug}</code>;
        },
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'website',
        header: 'Website',
      },

      {
        accessorKey: 'type',
        header: 'Type',
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
    ],
  });

  return (
    <>
      <DataTable {...table} />
    </>
  );
};
