import BigFormField from "@/components/ui/inputs/BigFormField";
import {OAuthLink} from "@/components/specific/settings/OAuthLink";
import {InputAndButtonContainer} from "@/components/specific/settings/Input";
import React from "react";

export default function MastodonLinkAccountForm() {
    return <InputAndButtonContainer>
        <BigFormField placeholder={"https://mastodon.social"}></BigFormField>
        <OAuthLink provider={"mastodon"} decentralized={true}>Click to connect Mastodon</OAuthLink>
    </InputAndButtonContainer>
}