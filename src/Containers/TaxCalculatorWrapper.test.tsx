// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import TaxCalculatorWrapper from "./TaxCalculatorWrapper";
import { fireEvent, render } from "@testing-library/react";
import * as api from "../Utils/Api";

describe(TaxCalculatorWrapper, () => {
    it('should submit a request when submit button is pressed', () => {
        const spy = vi.spyOn(api, 'getTaxBrackets').mockImplementation(async () => {
            return await {tax_brackets: []};
        });
        const { getByTestId, unmount } = render(<TaxCalculatorWrapper/>);
        
        const annualIncomeInput = getByTestId('annual-income-input').querySelector('input') as HTMLInputElement;
        expect(annualIncomeInput).toBeDefined();
        fireEvent.change(annualIncomeInput, {target: {value: '100000'}});

        const taxYearInput = getByTestId('tax-year-input').querySelector('input') as HTMLInputElement;
        expect(taxYearInput).toBeDefined();
        fireEvent.change(taxYearInput, {target: {value: '2019'}});

        const button = getByTestId('submit-button').querySelector('button') as HTMLButtonElement;
        expect(button).toBeDefined();
        fireEvent.click(button);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith("2019", expect.any(Function));

        unmount()
    })
})