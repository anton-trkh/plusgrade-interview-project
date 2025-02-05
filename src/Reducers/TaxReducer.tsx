import { TaxBracket } from "../Api";

export enum TaxActionType {
    SET = 'SET'
}

export interface TaxValue extends TaxBracket {
    taxOwed: number;
}

export interface ITaxState {
    taxes: TaxValue[];
}

interface ITaxAction {
    type: TaxActionType;
    taxBrackets: TaxBracket[],
    annualIncome: number
}

export function taxReducer(state: ITaxState, {type, taxBrackets, annualIncome}: ITaxAction): ITaxState {
    if (type == TaxActionType.SET) {
        const taxInfos = taxBrackets?.map(({max, min, rate}): TaxValue => ({
            max,
            min,
            rate,
            taxOwed: calculateTaxOwed(annualIncome, max, min, rate)
        }));
        return ({
            taxes: taxInfos
        });
    }
    return {...state}
}

function calculateTaxOwed(income: number, max: number | undefined, min: number, rate: number): number {
    if (income < min) {
        return 0;
    }
    else if (income >= min && max === undefined) {
        return (income - min) * rate;
    }
    else if (income >= min && max && income < max) {
        return (income - min) * rate;
    }
    else if (income >= min && max && income >= max) {
        return (max - min) * rate;
    }
    throw new Error(`Invalid tax bracket. Income: ${income}, Max: ${max}, Min: ${min}, Rate: ${rate}`);
}