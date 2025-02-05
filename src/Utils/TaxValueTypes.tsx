export interface TaxValue extends TaxBracket {
    taxOwed: number;
}

export interface TaxBracketsResponse {
    tax_brackets: TaxBracket[]
}

export interface TaxBracket {
    max?: number;
    min: number;
    rate: number;
}