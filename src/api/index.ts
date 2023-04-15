import axios, { AxiosError, AxiosResponse } from "axios";
import { Response, Sales, SortNotionType, } from "../types";
import { SALES } from "./urls"

const post = async <T>(url: string, payload: {}) => {
    return await axios.post<T>(url, payload);
}

const getSalesData = async ({ sortQuery }: { sortQuery?: SortNotionType }): Promise<Response<Sales[]>> => {
    let response: AxiosResponse<Sales[], any>
    try {
        //response = await get<Sales[]>(SALES);
        let payload = {};
        console.log("sortQuery received:", sortQuery)
        if (sortQuery?.sorts) {
            payload = { sortParams: sortQuery }
        }

        response = await post<Sales[]>(SALES, payload);
        return resolveResponse<Sales[]>(response);
    } catch (err: unknown | AxiosError) {
        return resolveErrorResponse(err);
    }
}



const getSortedData = async (sortBy: SortNotionType): Promise<Response<Sales[]>> => {
    let response: AxiosResponse<Sales[], any>
    try {
        response = await post<Sales[]>(SALES, sortBy);
        return resolveResponse<Sales[]>(response);
    } catch (err: unknown | AxiosError) {
        return resolveErrorResponse(err);
    }
}

const resolveErrorResponse = (err: unknown | AxiosError) => {
    if (axios.isAxiosError(err)) {
        return { isError: true, data: [], message: err.message }
    }
    return { isError: true, data: [], message: "" }
}


const resolveResponse = <T>(response: AxiosResponse): Response<T> => {
    if (response.status === 200) {
        return { isError: false, data: response.data }
    }
    return { isError: true, data: response.data }
}


export { getSalesData, getSortedData }