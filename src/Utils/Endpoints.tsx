const API_URL_BASE = import.meta.env.VITE_API_BASE;

export function developmentEndpoint(): string {
    return `${API_URL_BASE}/tax-calculator/`
}
export function testEndpoint(taxYear: string): string {
    return `${API_URL_BASE}/tax-calculator/tax-year/${taxYear}`
}