/* eslint-disable @typescript-eslint/prefer-for-of -- Can change later */
import type { RowData, Table } from '@tanstack/react-table';
import { getMemoOptions, memo } from '@tanstack/react-table';

export function getFacetedUniqueValues<TData extends RowData>(): (
  table: Table<TData>,
  columnId: string
) => () => Map<unknown, number> {
  return (table, columnId) =>
    memo(
      () => [table.getColumn(columnId)?.getFacetedRowModel()],
      (facetedRowModel) => {
        if (!facetedRowModel) return new Map();

        const facetedUniqueValues = new Map<unknown, number>();

        for (let i = 0; i < facetedRowModel.flatRows.length; i++) {
          const values =
            facetedRowModel.flatRows[i].getUniqueValues<number>(columnId);

          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Can be undefined
          if (values) {
            for (let j = 0; j < values.length; j++) {
              const value = values[j];

              if (Array.isArray(value)) {
                // biome-ignore lint/style/useForOf: <explanation>
                for (let k = 0; k < value.length; k++) {
                  if (facetedUniqueValues.has(value[k])) {
                    facetedUniqueValues.set(
                      value[k],
                      (facetedUniqueValues.get(value[k]) ?? 0) + 1
                    );
                  } else {
                    facetedUniqueValues.set(value[k], 1);
                  }
                }
                continue;
              }
              if (facetedUniqueValues.has(value)) {
                facetedUniqueValues.set(
                  value,
                  (facetedUniqueValues.get(value) ?? 0) + 1
                );
              } else {
                facetedUniqueValues.set(value, 1);
              }
            }
          }
        }

        return facetedUniqueValues;
      },
      getMemoOptions(
        table.options,
        'debugTable',
        `getFacetedUniqueValues_${columnId}`
      )
    );
}
