import { TaxValue } from "../Utils/TaxValueTypes";
import Grid from '@mui/material/Grid2';
import TextInput from "./TextInput";
import TaxTable from "./TaxTable";
import ContainedButton from "./ContainedButton";

interface ITaxCalculator{
    hasAnnualIncomeError: boolean;
    hasTaxYearError: boolean;
    annualIncome: string;
    taxYear: string;
    taxes: TaxValue[];
    submitButtonEnabled: boolean;
    totalTaxOwed: number;
    effectiveTaxRate: number;
    isLoading: boolean;
    setAnnualIncome: (value: string) => void;
    setTaxYear: (value: string) => void;
    handleSubmit: () => void
}

export default function TaxCalculator({
    hasAnnualIncomeError,
    hasTaxYearError,
    annualIncome,
    taxYear,
    taxes,
    submitButtonEnabled,
    totalTaxOwed,
    effectiveTaxRate,
    isLoading,
    setAnnualIncome,
    setTaxYear,
    handleSubmit
}: ITaxCalculator) {
    return (
        <Grid 
            container
            direction="row"
            sx={{
                marginTop: "10%",
                marginLeft: "25%",
                marginRight: "25%"
            }}
        >
            <Grid size={16}>
                <h1>
                    Welcome to the tax calculator. Please enter your annual income and specify the tax year to calculate your taxes.
                </h1>
            </Grid>
            <Grid size={4} data-testid="annual-income-input">
                <TextInput
                    helperText="Annual Income"
                    error={hasAnnualIncomeError}
                    errorText="Error: Enter a number greater than 0"
                    value={annualIncome}
                    callback={(value) => {setAnnualIncome(value)}}
                />
            </Grid>
            <Grid size={4} data-testid="tax-year-input">
                <TextInput
                    helperText="Tax Year"
                    value={taxYear}
                    error={hasTaxYearError}
                    errorText="Error: Enter a number greater than 0"
                    callback={(value) => {setTaxYear(value)}}
                />
            </Grid>
            <Grid 
                size={4} 
                data-testid="submit-button"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "30px"
                }}
            >
                <ContainedButton 
                    handleSubmit={handleSubmit}
                    isButtonEnabled={submitButtonEnabled}
                    text="Submit"
                />
            </Grid>
            <Grid size={12}>
                {
                    !isLoading && 
                    taxes.length > 0 &&
                    <TaxTable taxes={taxes} totalTaxOwed={totalTaxOwed} effectiveTaxRate={effectiveTaxRate}/>
                }
            </Grid>
        </Grid>
    );
}