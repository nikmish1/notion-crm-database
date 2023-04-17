import {
  useReactTable,
  ColumnResizeMode,
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
  columns: ColumnDef<T, any>[];
  sorting: SortingState;
  onSorting: OnChangeFn<SortingState>;
};

const getHeaderDraggedIdx = (list: any[], key: string, id: string): number => {
  const idx = list.findIndex((col) => {
    console.log({ col: col[key], id });
    return col[key] === id;
  });

  console.log({ idx });
  return idx;
};

const Table = <T extends object>({ data, columns, onSorting, sorting }: TableProps<T>) => {
  const [columnResizeMode, setColumnResizeMode] = useState<ColumnResizeMode>('onChange');
  const [colHeaders, setColHeaders] = useState<any>(columns);
  const [dragOver, setDragOver] = useState('');

  const table = useReactTable({
    data,
    columns: colHeaders,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: columnResizeMode,
    enableColumnResizing: true,
    state: {
      sorting,
    },
    onSortingChange: onSorting,
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
  });

  const handleDragStart = (e: React.DragEvent<HTMLTableHeaderCellElement>, headerId: string) => {
    e.dataTransfer.setData('colIdx', headerId);

    const { id } = e.target as HTMLTableHeaderCellElement;
    const idx = getHeaderDraggedIdx(colHeaders, 'accessorKey', id.split('-')[1]);
    console.log('headerDraggedIdx', idx);
    e.dataTransfer.setData('colIdx', idx.toString());
  };
  const handleDragOver = (e: React.DragEvent<HTMLTableHeaderCellElement>) => e.preventDefault();

  const handleDragEnter = (e: React.DragEvent<HTMLTableHeaderCellElement>) => {
    e.preventDefault();
    const { id } = e.target as HTMLTableHeaderCellElement;
    console.log(' handleDragEnter id: ', id, '------', id.split('-')[1]);
    setDragOver(id.split('-')[1]);
  };

  const handleOnDrop = (e: React.DragEvent<HTMLTableHeaderCellElement>) => {
    const { id } = e.target as HTMLTableHeaderCellElement;
    console.log('id: ', id, '---', id.split('-')[1]);
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
                console.log('header.id:', header.id);
                return (
                  <th
                    id={`th-${header.id}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, header.id)}
                    onDragOver={handleDragOver}
                    onDragEnter={(e) => handleDragEnter(e)}
                    onDrop={handleOnDrop}
                    {...{
                      colSpan: header.colSpan,
                      style: {
                        width: header.getSize(),
                      },
                    }}
                    className={header.id === dragOver ? 'dragOver' : ''}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        id={`div-${header.id}`}
                        {...{
                          className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <div
                          {...{
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            className: `resizer ${
                              header.column.getIsResizing() ? 'isResizing' : ''
                            }`,
                          }}
                        />
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
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
