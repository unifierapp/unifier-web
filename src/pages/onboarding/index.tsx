import FullScreenOverlayWithCenteredItem from "@/components/layouts/FullScreenOverlayWithCenteredItem";
import Separator from "@/components/ui/Separator";
import classes from "./index.module.css";
import google from "@/icons/providers/google.svg"
import {FormLink, OAuthLink} from "@/components/ui/Link";
import {domainToUrl, getBackendUrl} from "@/helpers/url";
import mail from "@/icons/mail.svg";
import SmallField from "@/components/ui/inputs/SmallFormField";
import React from "react";
import PrivateRoute from "@/components/ui/PrivateRoute";

export default function Onboarding() {
    const [mastodonEndpoint, setMastodonEndpoint] = React.useState("");
    const mastodonAuthUrl = new URL(getBackendUrl("/auth/mastodon"));
    mastodonAuthUrl.searchParams.set("endpoint", mastodonEndpoint);

    return <PrivateRoute>
        <FullScreenOverlayWithCenteredItem>
            <div className={classes.container}>
                <h1 className={classes.heading}>Log In</h1>
                <p>Connect your accounts to Unified and start experiencing the power today.</p>
                <OAuthLink href={getBackendUrl("/auth/twitter")} icon={google}>Click to connect Twitter</OAuthLink>
                <OAuthLink href={getBackendUrl("/auth/twitch")} icon={google}>Click to connect Twitch</OAuthLink>
                <SmallField icon={mail} name={"endpoint"} type={"url"}
                            placeholder={"https://mastodon.social"} onBlur={e => {
                    const newValue = domainToUrl(e.currentTarget.value);
                    e.currentTarget.value = newValue;
                    setMastodonEndpoint(newValue);
                }}></SmallField>
                <OAuthLink href={mastodonAuthUrl.toString()} icon={google}>Click to connect Mastodon</OAuthLink>
                <OAuthLink href={getBackendUrl("/auth/linkedin")} icon={google}>Click to connect LinkedIn</OAuthLink>
                <OAuthLink href={getBackendUrl("/auth/instagram")} icon={google}>Click to connect Instagram</OAuthLink>
                <OAuthLink href={getBackendUrl("/auth/facebook")} icon={google}>Click to connect Facebook</OAuthLink>
                <Separator></Separator>
                <FormLink href={"/dashboard"}>Continue</FormLink>
            </div>
        </FullScreenOverlayWithCenteredItem>
    </PrivateRoute>;
}
