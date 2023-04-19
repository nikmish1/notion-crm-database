import { SortingState } from '@tanstack/react-table';

import columns from './columns';
import { useEffect, useState } from 'react';
import { useSales } from '../hooks/useSales';
import { getSortingParams } from '../utils/object-util';
import { Table, Filter } from '../components';

const SalesPage = () => {
  //const { isPending, sales } = useSales();
  const { sales, isPending, applyFilter } = useSales();
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    if (sorting.length > 0) {
      applyFilter(getSortingParams(sorting));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  const isError = sales?.isError;
  if (isError) {
    return <div>{sales.message}</div>;
  }
  if (isPending) {
    return <div>Loading...</div>;
  }

  const handleApplyFilter = (filter: any) => {
    console.log('filter', filter);
    applyFilter(filter);
  };

  return (
    <>
      {sales?.data && columns && (
        <>
          <Filter data={sales?.data} onApplyFilter={handleApplyFilter} />
          <Table data={sales?.data} columns={columns} onSorting={setSorting} sorting={sorting} />
        </>
      )}
    </>
  );
};

export default SalesPage;
