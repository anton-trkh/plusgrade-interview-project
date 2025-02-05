import { describe, expect, it } from "vitest"
import { ITaxState, TaxActionType, taxReducer } from "./TaxReducer"

describe(taxReducer, () => {
    it('should set tax bracket when income is less than maximum', () => {
        var newState: ITaxState = taxReducer({taxes: []}, {
            type: TaxActionType.SET,
            taxBrackets: [
                {
                    min: 0,
                    max: 1000,
                    rate: 0.15
                }
            ],
            annualIncome: 800
        })
        const expectedState: ITaxState = {
            taxes: [
                {
                    min: 0,
                    max: 1000,
                    rate: 0.15,
                    taxOwed: 120
                }
            ]
        }
        expect(newState).toEqual(expectedState);
    })
    it('should set tax bracket when income is greater than maximum', () => {
        var newState: ITaxState = taxReducer({taxes: []}, {
            type: TaxActionType.SET,
            taxBrackets: [
                {
                    min: 0,
                    max: 1000,
                    rate: 0.15
                }
            ],
            annualIncome: 1200
        })
        const expectedState: ITaxState = {
            taxes: [
                {
                    min: 0,
                    max: 1000,
                    rate: 0.15,
                    taxOwed: 150
                }
            ]
        }
        expect(newState).toEqual(expectedState);
    })
    it('should set tax bracket when no maximum is provided', () => {
        var newState: ITaxState = taxReducer({taxes: []}, {
            type: TaxActionType.SET,
            taxBrackets: [
                {
                    min: 0,
                    rate: 0.15
                }
            ],
            annualIncome: 1200
        })
        const expectedState: ITaxState = {
            taxes: [
                {
                    min: 0,
                    rate: 0.15,
                    taxOwed: 180
                }
            ]
        }
        expect(newState).toEqual(expectedState);
    })
    it('should set tax bracket when income is less than min', () => {
        var newState: ITaxState = taxReducer({taxes: []}, {
            type: TaxActionType.SET,
            taxBrackets: [
                {
                    min: 2000,
                    rate: 0.15
                }
            ],
            annualIncome: 1200
        })
        const expectedState: ITaxState = {
            taxes: [
                {
                    min: 2000,
                    rate: 0.15,
                    taxOwed: 0
                }
            ]
        }
        expect(newState).toEqual(expectedState);
    })
    it('should set multiple tax brackets', () => {
        var newState: ITaxState = taxReducer({taxes: []}, {
            type: TaxActionType.SET,
            taxBrackets: [
                {
                    min: 0,
                    max: 500,
                    rate: 0.15
                },
                {
                    min: 500,
                    max: 1000,
                    rate: 0.20
                }
            ],
            annualIncome: 1000
        })
        const expectedState: ITaxState = {
            taxes: [
                {
                    min: 0,
                    max: 500,
                    rate: 0.15,
                    taxOwed: 75
                },
                {
                    min: 500,
                    max: 1000,
                    rate: 0.20,
                    taxOwed: 100
                }
            ]
        }
        expect(newState).toEqual(expectedState);
    })
})