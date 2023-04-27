import BigFormField from "@/components/ui/inputs/BigFormField";
import {OAuthLink} from "@/components/specific/settings/OAuthLink";
import {InputAndButtonContainer} from "@/components/specific/settings/Input";
import React from "react";
import {domainToUrl} from "@/helpers/url";

export default function MastodonLinkAccountForm() {
    const [endpoint, setEndpoint] = React.useState("");

    return <InputAndButtonContainer>
        <BigFormField placeholder={"https://mastodon.social"} onBlur={e => {
            const value = domainToUrl(e.currentTarget.value);
            e.currentTarget.value = value;
            setEndpoint(value);
        }}></BigFormField>
        <OAuthLink provider={"mastodon"} decentralized={true} endpoint={endpoint}>Click to connect Mastodon</OAuthLink>
    </InputAndButtonContainer>
}