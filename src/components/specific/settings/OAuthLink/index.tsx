import React, {PropsWithChildren} from "react";
import Link from "@/components/ui/Link";
import {getBackendUrl} from "@/helpers/url";
import add from "@/icons/add.svg";
import twitter from "@/icons/providers/twitter.svg";
import linkedin from "@/icons/providers/linkedin.svg";
import mastodon from "@/icons/providers/mastodon.svg";
import facebook from "@/icons/providers/facebook.svg";
import instagram from "@/icons/providers/instagram.svg";
import {capitalize} from "@/helpers/string";
import classes from "./styles.module.css";
import {UserContext} from "@/contexts/UserContext";
import axios from "axios";
import api from "@/helpers/api";

const icon_mapping: Record<string, { src: string }> = {
    twitter: twitter,
    linkedin: linkedin,
    mastodon: mastodon,
    facebook: facebook,
    instagram: instagram,
};

export function OAuthLink({
                              provider, endpoint, decentralized = false, children
                          }: PropsWithChildren<{ provider: string, endpoint?: string, decentralized?: boolean }>) {
    const {accounts, refresh} = React.useContext(UserContext);
    const lookup = {
        linked: false,
        displayName: "",
    };
    for (let account of accounts) {
        if (account.provider === provider) {
            lookup.linked = true;
            lookup.displayName = account.displayName;
        }
    }
    const icon = icon_mapping[provider] ?? add;

    async function runUnlink(url: string) {
        await api.delete(url);
        refresh();
    }

    if (decentralized) {
        const linkInner = <>
            <img src={icon.src} alt={provider}/>
            Link a new {capitalize(provider)} account
        </>;
        if (!endpoint) {
            return <Link href={"#"} className={classes.oAuthLink}>{linkInner}</Link>;
        }
        const url = new URL(getBackendUrl(`/auth/${provider}`));
        url.searchParams.set("endpoint", endpoint);
        return <Link href={url.toString()} className={classes.oAuthLink}>
            {linkInner}
        </Link>;
    } else if (!lookup.linked) {
        return <Link href={getBackendUrl(`/auth/${provider}`)} className={classes.oAuthLink}>
            <img src={icon.src} alt={provider}/>
            Link your {capitalize(provider)} account
        </Link>;
    } else {
        const unlinkUrl = new URL(getBackendUrl(`/provider/unlink`));
        unlinkUrl.searchParams.set("provider", provider);
        return <Link href={unlinkUrl.toString()} onClick={(e) => {
            e.preventDefault();
            runUnlink(unlinkUrl.toString()).then();
        }} className={classes.oAuthLink}>
            <img src={icon.src} alt={provider}/>
            <span>Signed in as {lookup.displayName}</span>
        </Link>;
    }
}
