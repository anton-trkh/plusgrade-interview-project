import { useCallback, useContext, useState } from "react";
import { getTaxBrackets } from "../Utils/Api";
import { TaxBracket, TaxValue } from "../Utils/TaxValueTypes";
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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const errorContext = useContext(ErrorContext);

    const hasAnnualIncomeError = isNumericInputValid(annualIncome);
    const hasTaxYearError = isNumericInputValid(taxYear);

    const numericAnnualIncome = hasAnnualIncomeError ? 0 : Number(annualIncome);
    const submitButtonEnabled = annualIncome.length > 0 && 
        taxYear.length > 0 && 
        !hasAnnualIncomeError && 
        !hasTaxYearError && 
        !isLoading;

    const handleSubmit = async (): Promise<void> => {
        setTaxBrackets([]);
        setIsLoading(true);
        const result = await getTaxBrackets(taxYear, errorContext.dispatch);
        setTaxBrackets(result.tax_brackets);
        setIsLoading(false);
    }

    const taxBracketsDependency = JSON.stringify(taxBrackets);
    const taxes = useCallback(() => taxBrackets?.map(
        (taxBracket: TaxBracket): TaxValue => ({
            ...taxBracket, 
            taxOwed: calculateTaxOwed(numericAnnualIncome, taxBracket
        )}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    )), [taxBracketsDependency])();

    const taxesDependency = JSON.stringify(taxes);
    const totalTaxOwed = useCallback(() => taxes?.reduce((acc: number, { taxOwed }: TaxValue): number => (acc + taxOwed), 0),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [taxesDependency]
    )();
    const effectiveTaxRate = numericAnnualIncome == 0 ? 0 : totalTaxOwed / numericAnnualIncome * 100

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
            isLoading={isLoading}
            setAnnualIncome={setAnnualIncome}
            setTaxYear={setTaxYear}
            handleSubmit={handleSubmit}
        />
    );
}