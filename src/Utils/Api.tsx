import * as Endpoints from "./endpoints";
import { ErrorType } from "./ErrorType";
import { TaxBracketsResponse } from "./TaxValue";


export const getTaxBrackets = async (taxYear: string, errorHandler: (errorKind: ErrorType) => void): Promise<TaxBracketsResponse> => {
    const url: string = import.meta.env.VITE_DEVELOPMENT_MODE === 'true'
        ? Endpoints.developmentEndpoint()
        : Endpoints.testEndpoint(taxYear);
    try {
        return await callApi(url, errorHandler);
    } catch {
        return {tax_brackets: []};
    }
}

const callApi = async <T, >(url: string, errorHandler: (errorKind: ErrorType) => void): Promise<T> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.status.toString());
        }
        return await response.json() as T;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        if (e.message === '404') {
            errorHandler(ErrorType.NOT_FOUND);
        }
        else if (e.message === '500') {
            errorHandler(ErrorType.INTERNAL_SERVER_ERROR);
        }
        else {
            errorHandler(ErrorType.UNKNOWN);
        }
        throw e;
    }
}