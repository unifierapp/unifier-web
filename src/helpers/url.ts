export function getBackendUrl(path: string) {
    return new URL(path, process.env.NEXT_PUBLIC_BACKEND_URL).toString();
}

export function domainToUrl(domain: string): string {
    try {
        return new URL(domain).toString();
    } catch {
    }
    try {
        const urlFactors = domain.split(".");
        if (!urlFactors.every(factor => {
            const result = /^\w+$/.test(factor)
            console.log(factor, result);
            return result;
        })) {
            return "";
        }
        const url = `https://${domain}`;
        return new URL(url).toString();
    } catch {
        return "";
    }
}
