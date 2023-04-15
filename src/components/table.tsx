import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getSortedRowModel,
  SortingState,
  ColumnSort,
  Updater,
  OnChangeFn,
} from '@tanstack/react-table';
import './table.module.css';
import { useEffect, useState } from 'react';

type TableProps<T> = {
  data: T[];
  columns: any[];
  sorting: SortingState;
  onSorting: OnChangeFn<SortingState>;
};

const Table = <T extends object>({ data, columns, onSorting, sorting }: TableProps<T>) => {
  //const [sorting, setSorting] = useState<SortingState>([]);

  // useEffect(() => {
  //   onSorting(sorting);
  // }, [onSorting, sorting]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: onSorting,
    // sortingFns: {
    //   myCustomSorting: (rowA: any, rowB: any, columnId: any): number => {
    //     console.log('rowA', rowA.getValue(columnId).value);
    //     return rowA.getValue(columnId).value < rowB.getValue(columnId).value ? 1 : -1;
    //   },
    // },
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
