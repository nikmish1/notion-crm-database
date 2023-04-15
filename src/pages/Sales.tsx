import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from '../components/table';

const Sales = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://jsonplaceholder.typicode.com/posts');
      setData(result.data);
    };

    fetchData();
  }, []);

  return <Table />;
};

export default Sales;
