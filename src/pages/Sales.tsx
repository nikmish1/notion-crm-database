import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from '../components/table';
import { useSales } from '../hooks';

const Sales = () => {
  //   const [data, setData] = useState([]);

  const { isPending, sales } = useSales();
  //const { error, setError } = useState({ error: false, message: '' });

  const isError = sales?.isError;

  if (isError) {
    return <div>{sales.message}</div>;
  }

  return <>{isPending ? <div>Loading...</div> : sales?.data && <Table data={sales?.data} />}</>;
};

export default Sales;
