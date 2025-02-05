// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import TaxTableRow from "./TaxTableRow";
import { render } from "@testing-library/react";

describe(TaxTableRow, () => {
    it('Should display correct bracket if min and max are provided', () => {
        const { getByTestId, unmount} = render(
            <TaxTableRow 
                min={0}
                max={1000}
                rate={0.15}
                taxOwed={150}
            />
        );
        const element = getByTestId('tax-bracket').textContent;
        expect(element).toEqual('$0-$1000');
        unmount();
    })
    it('Should display correct bracket if only min is provided', () => {
        const { getByTestId, unmount} = render(
            <TaxTableRow 
                min={0}
                rate={0.15}
                taxOwed={150}
            />
        );
        const element = getByTestId('tax-bracket').textContent;
        expect(element).toEqual('$0');
        unmount();
    })
    it('Should display correct tax rate', () => {
        const { getByTestId, unmount} = render(
            <TaxTableRow 
                min={0}
                max={1000}
                rate={0.15}
                taxOwed={150}
            />
        );
        const element = getByTestId('tax-rate').textContent;
        expect(element).toEqual('0.15');
        unmount();
    })
    it('Should display correct taxowed amount', () => {
        const { getByTestId, unmount} = render(
            <TaxTableRow 
                min={0}
                max={1000}
                rate={0.15}
                taxOwed={150}
            />
        );
        const element = getByTestId('tax-owed').textContent;
        expect(element).toEqual('150.00');
        unmount();
    })
})