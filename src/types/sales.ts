export type Sales = {
    id: number;
    name: string;
    company: string;
    status: { name: "low" | "medium" | "high", color: string }
    estimated_value: number;
    account_owner: string;
}

export type Column = {
    Header: string;
    accessor: string;
}

export type SortNotionType = {
    sorts: [{
        property: string,
        direction: 'ascending' | 'descending'
    }]
}