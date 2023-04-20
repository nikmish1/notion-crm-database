import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  SortingState,
  OnChangeFn,
  ColumnDef,
} from '@tanstack/react-table';

import './table.css';
import { useState } from 'react';

type TableProps<T> = {
  data: T[];
  isDataLoading: boolean;
  columns: ColumnDef<T, any>[];
  sorting: SortingState;
  onSorting: OnChangeFn<SortingState>;
};

export const getHeaderDraggedIdx = (list: any[], key: string, id: string): number => {
  const idx = list.findIndex((col) => {
    console.log({ col: col[key], id });
    return col[key] === id;
  });

  return idx;
};

export const Table = <T extends object>({
  data,
  isDataLoading,
  columns,
  onSorting,
  sorting,
}: TableProps<T>) => {
  const [colHeaders, setColHeaders] = useState<any>(columns);
  const [dragOver, setDragOver] = useState('');

  const table = useReactTable({
    data,
    columns: colHeaders,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
    enableColumnResizing: true,
    state: {
      sorting,
    },
    onSortingChange: onSorting,
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
  });

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, headerId: string) => {
    e.dataTransfer.setData('colIdx', headerId);
    const { id } = e.target as HTMLDivElement;
    const idx = getHeaderDraggedIdx(colHeaders, 'accessorKey', id.split('-')[1]);

    e.dataTransfer.setData('colIdx', idx.toString());
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { id } = e.target as HTMLDivElement;

    setDragOver(id.split('-')[1]);
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const { id } = e.target as HTMLDivElement;
    if (!id) {
      return;
    }
    const droppedColIdx = getHeaderDraggedIdx(colHeaders, 'accessorKey', id.split('-')[1]);
    const draggedColIdx = +e.dataTransfer.getData('colIdx');

    const tempCols = [...colHeaders];

    if (draggedColIdx !== droppedColIdx) {
      tempCols[draggedColIdx] = colHeaders[droppedColIdx];
      tempCols[droppedColIdx] = colHeaders[draggedColIdx];

      setColHeaders(tempCols);
      setDragOver('');
    }
  };

  return (
    <div>
      <table
        {...{
          style: {
            width: table.getCenterTotalSize(),
          },
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    id={`th-${header.id}`}
                    {...{
                      colSpan: header.colSpan,
                      style: {
                        width: header.getSize(),
                      },
                    }}
                    className={header.id === dragOver ? 'dragOver' : ''}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          id={`div-${header.id}`}
                          draggable
                          onDragStart={(e) => handleDragStart(e, header.id)}
                          onDragOver={handleDragOver}
                          onDragEnter={(e) => handleDragEnter(e)}
                          onDrop={handleOnDrop}
                          // style={{ width: '50%', textAlign: 'center' }}
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          <div style={{ display: 'flex', gap: '0.2rem' }}>
                            <span>
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </span>
                            {/* <pre>{JSON.stringify(header.column.getIsSorted())}</pre> */}
                            <span>
                              {{
                                asc: ' 🔼',
                                desc: ' 🔽',
                              }[header.column.getIsSorted() as string] ?? null}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div
                            {...{
                              onMouseDown: header.getResizeHandler(),
                              onTouchStart: header.getResizeHandler(),
                              className: `resizer ${
                                header.column.getIsResizing() ? 'isResizing' : ''
                              }`,
                            }}
                          />
                        </div>
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {isDataLoading ? (
            <tr>Loading...</tr>
          ) : table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>No data found</tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
