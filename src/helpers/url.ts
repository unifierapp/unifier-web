export function getBackendUrl(path: string) {
    return new URL(path, process.env.NEXT_PUBLIC_BACKEND_URL).toString();
}

export function domainToUrl(domain: string): string {
    try {
        return new URL(domain).toString();
    } catch {
        return `https://${domain}`;
    }
}
