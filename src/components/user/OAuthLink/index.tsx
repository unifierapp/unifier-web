import React, {PropsWithChildren} from "react";
import Link, {LinkProps} from "next/link";
import {getBackendUrl} from "@/helpers/url";
import add from "@/icons/add.svg";
import cross from "@/icons/cross.svg";
import twitter from "@/icons/providers/twitter.svg";
import linkedin from "@/icons/providers/linkedin.svg";
import mastodon from "@/icons/providers/mastodon.svg";
import facebook from "@/icons/providers/facebook.svg";
import instagram from "@/icons/providers/instagram.svg";
import twitch from "@/icons/providers/twitch.svg";
import {capitalize} from "@/helpers/string";
import classes from "./styles.module.css";
import {UserContext} from "@/contexts/UserContext";
import api from "@/helpers/api";
import Image, {StaticImageData} from "next/image";
import LinkAccountModal from "@/components/specific/settings/components/LinkAccountModal";

const icon_mapping: Record<string, StaticImageData> = {
    twitter: twitter,
    linkedin: linkedin,
    mastodon: mastodon,
    facebook: facebook,
    instagram: instagram,
    twitch: twitch,
};

function LinkLayer(props: React.ComponentPropsWithoutRef<"a"> & LinkProps) {
    return <Link {...props} className={`${classes.linkInner}`}></Link>;
}

function Button(props: React.ComponentPropsWithoutRef<"button">) {
    return <button {...props} className={`${classes.linkInner}`}></button>;
}

export function OAuthLink({
                              provider, endpoint, decentralized = false, requiresPassword = false
                          }: { provider: string, endpoint?: string, decentralized?: boolean, requiresPassword?: boolean }) {
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
    const [modalShown, setModalShown] = React.useState(false);

    async function runUnlink(url: string) {
        await api.delete(url);
        refresh();
    }

    if (decentralized) {
        const linkInner = <>
            <Image src={icon} alt={provider}/>
            Link a new {capitalize(provider)} account
        </>;
        if (!endpoint) {
            return <div className={classes.oAuthLink}>
                {linkInner}
                <LinkLayer href={"#"}></LinkLayer>
            </div>;
        }
        const url = new URL(getBackendUrl(`/auth/${provider}`));
        url.searchParams.set("endpoint", endpoint);
        return <div className={classes.oAuthLink}>
            {linkInner}
            <LinkLayer href={url.toString()}></LinkLayer>
        </div>;
    } else if (!lookup.linked) {
        if (requiresPassword) {
            return <div className={classes.oAuthLink}>
                <Image src={icon} alt={provider}/>
                Link your {capitalize(provider)} account
                <Button onClick={(e) => {
                    e.preventDefault();
                    setModalShown(true);
                }}></Button>
                {modalShown ? <LinkAccountModal provider={provider} onOuterClick={() => setModalShown(false)}/> : null}
            </div>;
        } else {
            return <div className={classes.oAuthLink}>
                <Image src={icon} alt={provider}/>
                Link your {capitalize(provider)} account
                <LinkLayer href={getBackendUrl(`/auth/${provider}`)}></LinkLayer>
            </div>;
        }
    } else {
        const unlinkUrl = new URL(getBackendUrl(`/provider/unlink`));
        unlinkUrl.searchParams.set("provider", provider);
        return <div className={classes.oAuthLink}>
            <Image src={icon} alt={provider}/>
            <span className={classes.description}>Signed in as {lookup.displayName}</span>
            <button onClick={(e) => {
                e.preventDefault();
                runUnlink(unlinkUrl.toString()).then();
            }}>
                <Image src={cross} alt={`Unlink ${capitalize(provider)} account`}/>
            </button>
        </div>;
    }
}
