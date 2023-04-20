import { FilterOption } from "../types";

export const PropertiesAndTypes = {
    estimated_value: {
        "type": "number",

    },
    "name": {
        "id": "VVlb",
        "type": "rich_text",
    },
    "status": {
        "type": "select",
    },
    "account_owner": {
        "type": "created_by",

    },
    "company": {
        "id": "wc%5DX",
        "type": "rich_text",

    },
    "id": {

        "type": "title",
    }
}

export const filterOptions: FilterOption[] = [
    { id: 'id', name: 'Id', type: 'title' },
    { id: 'name', name: 'Name', type: 'rich_text' },
    {
        id: 'status',
        name: 'Status',
        type: 'select',
        options: [
            { id: 'high', name: 'high' },
            { id: 'low', name: 'low' },
            { id: 'medium', name: 'medium' },
        ],
    },
    { id: 'account_owner', name: 'Account Owner', type: 'created_by' },
    { id: 'company', name: 'Company', type: 'rich_text' },
    { id: 'estimated_value', name: 'Estimated Value', type: 'number' },
];