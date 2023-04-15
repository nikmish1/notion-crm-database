import { useCallback, useEffect, useState } from "react";
import { Sales, Response, SortNotionType } from "../types";
import { getSalesData, getSortedData } from "../api";

type useSalesResponse = {
    sortData: (sortQuery: SortNotionType) => void
    sales: Response<Sales[]> | undefined;
    isPending: boolean;
}

export const useSorting = (): useSalesResponse => {
    const [isPending, setIsPending] = useState<boolean>(false)
    const [sales, setSales] = useState<Response<Sales[]>>();

    const getData = useCallback(
        (async (sortQuery?: SortNotionType) => {
            setIsPending(true);
            const sales = await getSalesData({ sortQuery });
            setIsPending(false);
            setSales(sales)
        }),
        [],
    )

    useEffect(() => {
        getData()
    }, [getData])

    const sortData = (sortQuery: SortNotionType) => {
        getData(sortQuery);
    }

    return { sales, isPending, sortData }

}