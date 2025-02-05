import { TaxBracket } from "../Api";

export interface TaxValue extends TaxBracket {
    taxOwed: number;
}
