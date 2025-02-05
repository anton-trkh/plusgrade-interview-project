import { ErrorKind } from "./Enums/ErrorReducer";

interface TaxBracketsResponse {
    tax_brackets: TaxBracket[]
}

export interface TaxBracket {
    max?: number;
    min: number;
    rate: number;
}

const BASE_URL = import.meta.env.VITE_API_BASE;

export const getTaxBrackets = async (taxYear: string, errorHandler: (errorKind: ErrorKind) => void): Promise<TaxBracketsResponse> => {
    const url: string = import.meta.env.VITE_DEVELOPMENT_MODE === 'true'
        ? `${BASE_URL}/tax-calculator`
        : `${BASE_URL}/tax-calculator/tax-year/${taxYear}`;
    try {
        return await callApi(url, errorHandler);
    } catch {
        return {tax_brackets: []};
    }
}

const callApi = async <T, >(url: string, errorHandler: (errorKind: ErrorKind) => void): Promise<T> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.status.toString());
        }
        return await response.json() as T;
    } catch (e: any) {
        if (e.message === '404') {
            errorHandler(ErrorKind.NOT_FOUND);
        }
        else if (e.message === '500') {
            errorHandler(ErrorKind.INTERNAL_SERVER_ERROR);
        }
        else {
            errorHandler(ErrorKind.UNKNOWN);
        }
        throw e;
    }
}