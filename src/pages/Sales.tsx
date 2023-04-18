import { SortingState } from '@tanstack/react-table';

import columns from './columns';
import { useEffect, useState } from 'react';
import { useSorting } from '../hooks/useSorting';
import { getSortingParams } from '../utils/object-util';
import { Table, Filter } from '../components';

const SalesPage = () => {
  //const { isPending, sales } = useSales();
  const { sales, isPending, sortData } = useSorting();
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    if (sorting.length > 0) {
      sortData(getSortingParams(sorting));
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

  const handleApplyFilter = () => {
    throw new Error('Function not implemented.');
  };

  return (
    <>
      {sales?.data && columns && (
        <>
          <Filter onApplyFilter={handleApplyFilter} />
          <Table data={sales?.data} columns={columns} onSorting={setSorting} sorting={sorting} />
        </>
      )}
    </>
  );
};

export default SalesPage;
