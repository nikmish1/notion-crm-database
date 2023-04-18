import { createColumnHelper } from '@tanstack/react-table';
import { Sales } from '../types';

const columnHelper = createColumnHelper<Sales>();

const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue().title[0].plain_text,
  }),
  columnHelper.accessor('name', {
    cell: (info) => {
      console.log({ info });
      return <i>{info.getValue().rich_text[0].plain_text}</i>;
    },
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor('company', {
    header: () => 'Company',
    cell: (info) => info.getValue()?.rich_text[0].plain_text,
  }),
  columnHelper.accessor('status', {
    header: () => <span>Status</span>,
    cell: (info) => info.getValue()?.select.name,
  }),
  columnHelper.accessor('estimated_value', {
    header: 'Est. Value',
    cell: (info) => info.getValue()?.number,
  }),
  columnHelper.accessor('account_owner', {
    header: 'Account Owner',
    cell: (info) => info.getValue()?.created_by.id,
  }),
];

export default columns;
