import { Column } from "../types";

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