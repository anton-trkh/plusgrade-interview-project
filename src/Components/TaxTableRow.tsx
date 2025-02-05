import { TableCell, TableRow } from "@mui/material";
import { TaxValue } from "../Reducers/TaxReducer";

export default function TaxTableRow({min, max, rate, taxOwed}: TaxValue) {
    const taxBracket = max
        ? `$${min}-$${max}`
        : `$${min}`
    return (
        <TableRow key={min}>
            <TableCell data-testid='tax-bracket'>
                {taxBracket}
            </TableCell>
            <TableCell data-testid='tax-rate'>
                {rate}
            </TableCell>
            <TableCell data-testid='tax-owed'>
                {taxOwed.toFixed(2)}
            </TableCell>
        </TableRow>
    );
}