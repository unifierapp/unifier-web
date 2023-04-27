import React, {PropsWithChildren} from "react";
import Link from "@/components/ui/Link";
import {getBackendUrl} from "@/helpers/url";
import add from "@/icons/add.svg";
import twitter from "@/icons/providers/twitter.svg";
import linkedin from "@/icons/providers/linkedin.svg";
import mastodon from "@/icons/providers/mastodon.svg"
import facebook from "@/icons/providers/facebook.svg";
import instagram from "@/icons/providers/instagram.svg";
import {capitalize} from "@/helpers/string";
import classes from "./styles.module.css";

const icon_mapping: Record<string, { src: string }> = {
    twitter: twitter,
    linkedin: linkedin,
    mastodon: mastodon,
    facebook: facebook,
    instagram: instagram,
}

export function OAuthLink({
                              provider, endpoint, decentralized = false, children
                          }: PropsWithChildren<{ provider: string, endpoint?: string, decentralized?: boolean }>) {
    const linked = false;
    const icon = icon_mapping[provider] ?? add;

    if (decentralized) {
        const linkInner = <>
            <img src={icon.src} alt={provider}/>
            Link a new {capitalize(provider)} account
        </>
        if (!endpoint) {
            return <Link href={"#"} className={classes.oAuthLink}>{linkInner}</Link>;
        }
        const url = new URL(getBackendUrl(`/api/auth/${provider}`));
        url.searchParams.set("endpoint", endpoint);
        return <Link href={url.toString()} className={classes.oAuthLink}>
            {linkInner}
        </Link>
    } else if (!linked) {
        return <Link href={getBackendUrl(`/api/auth/${provider}`)} className={classes.oAuthLink}>
            <img src={icon.src} alt={provider}/>
            Link your {capitalize(provider)} account
        </Link>
    } else {
        return <Link href={getBackendUrl(`/provider/unlink/${provider}`)} className={classes.oAuthLink}>
            <img src={icon.src} alt={provider}/>
            Unlink your {capitalize(provider)} account
        </Link>
    }
}
