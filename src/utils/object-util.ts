import { SortingState } from "@tanstack/react-table";
import { Column, NotionPayload } from "../types";

export const getColumns = <T>(obj: T): Column[] | undefined => {
    if (typeof obj === 'object' && obj !== null) {
        const keys = Object.keys(obj);

        return keys.map((key) => {
            return {
                Header: key,
                accessor: key,
            };
        })
    }
}

export const getSortingParams = (sortingState: SortingState): NotionPayload => {
    return {
        sorts: [
            {
                property: sortingState[0].id,
                direction: sortingState[0].desc ? 'descending' : 'ascending',
            },
        ],
    };
}