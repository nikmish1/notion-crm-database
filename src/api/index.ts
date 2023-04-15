import axios, { AxiosError, AxiosResponse } from "axios";
import { Response, Sales, } from "../types";
import { SALES } from "./urls"

const get = async <T>(url: string) => {
    return await axios.get<T>(url);
}

const getSalesData = async (): Promise<Response<Sales[]>> => {
    let response: AxiosResponse<Sales[], any>
    try {
        response = await get<Sales[]>(SALES);
        return resolveResponse<Sales[]>(response);
    } catch (err: unknown | AxiosError) {
        return resolveErrorResponse(err);
    }
}

const sortSortedData = async (): Promise<Response<Sales[]>> => {
    let response: AxiosResponse<Sales[], any>
    try {
        response = await get<Sales[]>(SALES);
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


export { getSalesData, sortSalesData }