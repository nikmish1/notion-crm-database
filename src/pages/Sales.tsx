import Table from '../components/table';
import { useSales } from '../hooks';

import columns from './columns';

const SalesPage = () => {
  const { isPending, sales } = useSales();

  const isError = sales?.isError;

  if (isError) {
    return <div>{sales.message}</div>;
  }
  if (isPending) {
    return <div>Loading...</div>;
  }

  return <>{sales?.data && columns && <Table data={sales?.data} columns={columns} />}</>;
};

export default SalesPage;
