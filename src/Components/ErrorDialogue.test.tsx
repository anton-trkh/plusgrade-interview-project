// @vitest-environment jsdom

import { describe, expect, it } from "vitest"
import ErrorDialogue from "./ErrorDialogue"
import { render } from "@testing-library/react";
import { ErrorType } from "../Utils/ErrorType";

describe(ErrorDialogue, () => {
    it('Should display appropriate error text when eroor is NOT_FOUND', () => {
        const { getByText, unmount} = render(
            <ErrorDialogue 
                error={ErrorType.NOT_FOUND} 
                setError={() => {}}
            />);

        const element = getByText('Specified tax year has not been found, please try a different year.');
        expect(element).toBeDefined();
        unmount()
    })
    it('Should display appropriate error text when eroor is INTERNAL_SERVER_ERROR', () => {
        const { getByText, unmount} = render(
            <ErrorDialogue 
                error={ErrorType.INTERNAL_SERVER_ERROR} 
                setError={() => {}}
            />);

        const element = getByText('A server error has occurred. Please try again later.');
        expect(element).toBeDefined();
        unmount()
    })
    it('Should display appropriate error text when eroor is UNKNOWN', () => {
        const { getByText, unmount} = render(
            <ErrorDialogue 
                error={ErrorType.UNKNOWN} 
                setError={() => {}}
            />);

        const element = getByText('An unknown error has occurred. Check your connection and try again.');
        expect(element).toBeDefined();
        unmount()
    })
    it('Should not display if error type is NONE', () => {
        const { queryByTestId, unmount} = render(
            <ErrorDialogue 
                error={ErrorType.NONE} 
                setError={() => {}}
            />);

        const element = queryByTestId('error-dialogue');
        expect(element).toBeNull();
        unmount()
    })
})