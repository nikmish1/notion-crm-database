import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from '../components/table';
import { useSales } from '../hooks';

const Sales = () => {
  //   const [data, setData] = useState([]);

  const { isPending, sales } = useSales();

  console.log({ isPending, sales });

  return (
    <>
      {isPending ? (
        <div>Loading...</div>
      ) : (
        (sales?.isError && <div>Error</div>) || <Table data={sales?.data} />
      )}
    </>
  );
};

export default Sales;
