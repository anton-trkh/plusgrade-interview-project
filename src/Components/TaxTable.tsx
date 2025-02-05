import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { TaxValue } from "../Types/TaxValue";
import TaxTableRow from "./TaxTableRow";
import { useMemo } from "react";

interface ITaxTable{
    taxes: TaxValue[];
    totalTaxOwed: number;
    effectiveTaxRate: number;
}
export default function TaxTable({
    taxes,
    totalTaxOwed,
    effectiveTaxRate
}: ITaxTable) {
    const taxDependency = JSON.stringify(taxes);
    return useMemo(() => (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableCell>
                        Tax Bracket
                    </TableCell>
                    <TableCell>
                        Tax Rate
                    </TableCell>
                    <TableCell>
                        Tax Owed in Bracket
                    </TableCell>
                </TableHead>
                <TableBody>
                    {
                        taxes.map(TaxTableRow)
                    }
                </TableBody>
                {totalTaxOwed > 0 && 
                    <TableFooter>
                        <TableRow>
                            <TableCell data-testid='tax-summary'>
                                Total Tax Owed: {totalTaxOwed.toFixed(2)}. Effective Tax Rate: {effectiveTaxRate.toFixed(2)}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                }
            </Table>
        </TableContainer>
    ), [taxDependency])
}
