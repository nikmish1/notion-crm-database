import { SortingState, Updater } from '@tanstack/react-table';
import Table from '../components/table';
import { useSales } from '../hooks';

import columns from './columns';
import { useEffect, useState } from 'react';

const SalesPage = () => {
  const { isPending, sales } = useSales();
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    console.log('sorting:', sorting);
  }, [sorting]);

  const isError = sales?.isError;
  if (isError) {
    return <div>{sales.message}</div>;
  }
  if (isPending) {
    return <div>Loading...</div>;
  }

  const handleSorting = (sorting: Updater<SortingState>) => {
    console.log('sorting:', sorting);
    setSorting(sorting);
  };

  return (
    <>
      {sales?.data && columns && (
        <Table data={sales?.data} columns={columns} onSorting={setSorting} sorting={sorting} />
      )}
    </>
  );
};

export default SalesPage;
