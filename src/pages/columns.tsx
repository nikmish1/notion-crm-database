import { createColumnHelper } from '@tanstack/react-table';
import { Sales } from '../types';

const columnHelper = createColumnHelper<Sales>();

const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor('company', {
    header: () => 'Company',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('status', {
    header: () => <span>Status</span>,
    cell: (info) => info.renderValue()?.name,
  }),
  columnHelper.accessor('estimated_value', {
    header: 'Estimated Value',
  }),
  columnHelper.accessor('account_owner', {
    header: 'Account Owner',
  }),
];

export default columns;
