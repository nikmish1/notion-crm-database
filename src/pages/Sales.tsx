import { OnChangeFn, SortingState, functionalUpdate } from '@tanstack/react-table';

import columns from './columns';
import { useCallback, useState } from 'react';
import { useSales } from '../hooks/useSales';
import { getSortingParams } from '../utils/object-util';
import { Table, Filter } from '../components';
import { FilterPayload, SortPayload } from '../types';

const SalesPage = () => {
  const { sales, isPending, applyFilter } = useSales();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filterPayload, setFilterPayload] = useState<FilterPayload>();

  const handleSorting: OnChangeFn<SortingState> = (e) => {
    const updatedSortingVal = functionalUpdate(e, sorting);
    const sortingPayload = {
      sorts: [...getSortingParams(updatedSortingVal)],
      filter: filterPayload,
    };
    applyFilter(sortingPayload);
    setSorting(updatedSortingVal);
  };

  const handleFilter = useCallback(
    (filter: FilterPayload) => {
      const sortPayload: SortPayload | undefined =
        sorting.length > 0 ? [...getSortingParams(sorting)] : undefined;
      applyFilter({ sorts: sortPayload, filter: filter });
      setFilterPayload(filter);
    },
    [applyFilter, sorting],
  );

  const isError = sales?.isError;
  if (isError) {
    return <div>{sales.message}</div>;
  }
  // if (isPending) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <Filter onApplyFilter={handleFilter} filterPayload={filterPayload} />
      {sales?.data && columns && (
        <Table
          isDataLoading={isPending}
          data={sales?.data}
          columns={columns}
          onSorting={handleSorting}
          sorting={sorting}
        />
      )}
    </>
  );
};

export default SalesPage;
