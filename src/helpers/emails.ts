const mailboxRules: [RegExp, string][] = [
    [/^gmail\.com($|\.[a-z]+)/, "https://mail.google.com"],
    [/^yahoo\.com($|\.[a-z]+)/, "https://mail.yahoo.com"]
];

export function resolveMailbox(email: string) {
    const suffix = email.split("@")[1];
    for (let [regexp, resolvedUrl] of mailboxRules) {
        if (regexp.test(suffix)) {
            return resolvedUrl;
        }
    }
    return "";
}
