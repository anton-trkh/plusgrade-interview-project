import { TaxValue } from "../Reducers/TaxReducer";
import Grid from '@mui/material/Grid2';
import TextInput from "./TextInput";
import { Button } from "@mui/material";
import TaxTable from "./TaxTable";

interface ITaxCalculator{
    hasAnnualIncomeError: boolean;
    hasTaxYearError: boolean;
    annualIncome: string;
    taxYear: string;
    taxes: TaxValue[];
    submitButtonEnabled: boolean;
    totalTaxOwed: number;
    effectiveTaxRate: number;
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
    setAnnualIncome,
    setTaxYear,
    handleSubmit
}: ITaxCalculator) {
    return (
        <Grid 
            container
            direction="row"
            sx={{
                justifyContent: "center",
                marginTop: "10%",
                marginLeft: "25%",
                marginRight: "25%"

            }}
        >
            <Grid size={16}>
                <h1>
                    Welcome to the tax calculator. Please enter your annual income and specify the tax year to submit the request.
                </h1>
            </Grid>
            <Grid size={4}>
                <TextInput
                    helperText="Annual Income"
                    error={hasAnnualIncomeError}
                    errorText="Error: Enter a number greater than 0"
                    value={annualIncome}
                    callback={(value) => {setAnnualIncome(value)}}
                />
            </Grid>
            <Grid size={4}>
                <TextInput
                    helperText="Tax Year"
                    value={taxYear}
                    error={hasTaxYearError}
                    errorText="Error: Enter a number greater than 0"
                    callback={(value) => {setTaxYear(value)}}
                />
            </Grid>
            <Grid size={4}>
                <Button
                    variant="contained" 
                    onClick={handleSubmit}
                    disabled={!submitButtonEnabled}
                >
                    Submit
                </Button>
            </Grid>
            <Grid size={12}>
                <TaxTable taxes={taxes} totalTaxOwed={totalTaxOwed} effectiveTaxRate={effectiveTaxRate}/>
            </Grid>
        </Grid>
    );
}