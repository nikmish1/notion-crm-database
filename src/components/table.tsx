import { Sales } from '../types';

type TableProps = {
  data: Sales[];
};

const Table = ({ data }: TableProps) => {
  console.log('{data}', { data });
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Estimated Value</th>
          <th>Account Owner</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.status}</td>
            <td>{item.estimated_value}</td>
            <td>{item.account_owner}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
