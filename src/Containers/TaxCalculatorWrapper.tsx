import { useContext, useReducer, useState } from "react";
import { getTaxBrackets } from "../Api";
import { taxReducer, TaxActionType, TaxValue } from "../Reducers/TaxReducer";
import { ErrorContext } from "../Context/ErrorContext";
import TaxCalculator from "../Components/TaxCalculator";

function isNumericInputValid(value: string) {
    return value !== '' && (isNaN(Number(value)) || Number(value) <= 0)
}

export default function TaxCalculatorWrapper(): JSX.Element {
    const [annualIncome, setAnnualIncome] = useState<string>("");
    const [taxYear, setTaxYear] = useState<string>("");

    const [{taxes}, dispatchTaxResponse] = useReducer(taxReducer, {taxes: []});
    
    const errorContext = useContext(ErrorContext);

    const hasAnnualIncomeError = isNumericInputValid(annualIncome);
    const hasTaxYearError = isNumericInputValid(taxYear);

    const submitButtonEnabled = annualIncome.length > 0 && taxYear.length > 0 && !hasAnnualIncomeError && !hasTaxYearError;
    const totalTaxOwed = taxes?.reduce((acc: number, { taxOwed }: TaxValue) => (acc + taxOwed), 0);
    const effectiveTaxRate = totalTaxOwed/ Number(annualIncome) * 100

    const handleSubmit = async (): Promise<void> => {
        dispatchTaxResponse({
            type: TaxActionType.SET,
            taxBrackets: [],
            annualIncome: 0
        })
        const result = await getTaxBrackets(taxYear, errorContext.dispatch);
        dispatchTaxResponse({
            type: TaxActionType.SET,
            taxBrackets: result.tax_brackets,
            annualIncome: Number(annualIncome)
        });
    }

    return (
        <TaxCalculator 
            hasAnnualIncomeError={hasAnnualIncomeError}
            hasTaxYearError={hasTaxYearError}
            annualIncome={annualIncome}
            taxYear={taxYear}
            taxes={taxes}
            submitButtonEnabled={submitButtonEnabled}
            totalTaxOwed={totalTaxOwed}
            effectiveTaxRate={effectiveTaxRate}
            setAnnualIncome={setAnnualIncome}
            setTaxYear={setTaxYear}
            handleSubmit={handleSubmit}
        />
    );
}