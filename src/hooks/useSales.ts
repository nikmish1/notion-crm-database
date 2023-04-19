import { useCallback, useEffect, useState } from "react";
import { Sales, Response, NotionPayload } from "../types";
import { getSalesData } from "../api";

type useSalesResponse = {
    applyFilter: (query: NotionPayload) => void
    sales: Response<Sales[]> | undefined;
    isPending: boolean;
}

export const useSales = (): useSalesResponse => {
    const [isPending, setIsPending] = useState<boolean>(false)
    const [sales, setSales] = useState<Response<Sales[]>>();

    const getData = useCallback(
        (async (query?: NotionPayload) => {
            setIsPending(true);
            const sales = await getSalesData({ query });
            setIsPending(false);
            setSales(sales);
        }),
        [],
    )

    useEffect(() => {
        getData()
    }, [getData])

    const applyFilter = (query: NotionPayload) => {
        getData(query);
    }

    return { sales, isPending, applyFilter }

}