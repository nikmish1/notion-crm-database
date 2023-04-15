import { useEffect, useState } from "react"

import { Sales, Response } from "../types";
import { getSalesData } from "../api";


type useSalesProps = {
    sales: Response<Sales[]> | undefined;
    isPending: boolean;
}

export const useSales = (): useSalesProps => {
    const [sales, setSales] = useState<Response<Sales[]>>();
    const [isPending, setIsPending] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            setIsPending(true);
            //const sales = await getSalesData();
            setIsPending(false);
            setSales(sales)
        })()

    }, [])

    return { sales, isPending }

}