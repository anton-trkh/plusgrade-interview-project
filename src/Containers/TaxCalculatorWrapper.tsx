import { useContext, useState } from "react";
import { getTaxBrackets, TaxBracket } from "../Api";
import { TaxValue } from "../Types/TaxValue";
import { ErrorContext } from "../Context/ErrorContext";
import TaxCalculator from "../Components/TaxCalculator";

function isNumericInputValid(value: string) {
    return value !== '' && (isNaN(Number(value)) || Number(value) <= 0)
}

function calculateTaxOwed(income: number, {max, min, rate}: TaxBracket): number {
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

export default function TaxCalculatorWrapper(): JSX.Element {
    const [annualIncome, setAnnualIncome] = useState<string>("");
    const [taxYear, setTaxYear] = useState<string>("");

    const [taxBrackets, setTaxBrackets] = useState<TaxBracket[]>([]);
    
    const errorContext = useContext(ErrorContext);

    const hasAnnualIncomeError = isNumericInputValid(annualIncome);
    const hasTaxYearError = isNumericInputValid(taxYear);

    const submitButtonEnabled = annualIncome.length > 0 && taxYear.length > 0 && !hasAnnualIncomeError && !hasTaxYearError;

    const handleSubmit = async (): Promise<void> => {
        setTaxBrackets([]);
        const result = await getTaxBrackets(taxYear, errorContext.dispatch);
        setTaxBrackets(result.tax_brackets);
    }

    const taxes = taxBrackets?.map(
        (taxBracket: TaxBracket): TaxValue => ({
            ...taxBracket, 
            taxOwed: calculateTaxOwed(Number(annualIncome), taxBracket
        )}
    ));

    const totalTaxOwed = taxes?.reduce((acc: number, { taxOwed }: TaxValue) => (acc + taxOwed), 0);
    const effectiveTaxRate = totalTaxOwed/ Number(annualIncome) * 100

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