import FullScreenOverlayWithCenteredItem from "@/components/layouts/FullScreenOverlayWithCenteredItem";
import Separator from "@/components/ui/Separator";
import classes from "./index.module.css";
import {FormLink} from "@/components/ui/Link";
import {OAuthLink} from "@/components/user/OAuthLink";
import {domainToUrl} from "@/helpers/url";
import mail from "@/icons/mail.svg";
import SmallField from "@/components/ui/inputs/SmallFormField";
import React from "react";
import PrivateRoute from "@/components/user/PrivateRoute";
import api from "@/helpers/api";
import {UserContext} from "@/contexts/UserContext";
import {useRouter} from "next/navigation";

export default function Onboarding() {
    const [mastodonEndpoint, setMastodonEndpoint] = React.useState("");
    const {onboard} = React.useContext(UserContext);
    const router = useRouter();

    async function finishOnboarding(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        try {
            await api.post("/user/finish_onboarding");
            onboard();
            router.push("/dashboard");
        } catch (exc) {
        }
    }

    return <PrivateRoute>
        <FullScreenOverlayWithCenteredItem>
            <div className={classes.container}>
                <h1 className={classes.primaryHeading}>Log In</h1>
                <p>Connect your accounts to Unified and start experiencing the power today.</p>
                <OAuthLink provider={"twitter"}></OAuthLink>
                <OAuthLink provider={"twitch"}></OAuthLink>
                <SmallField icon={mail} name={"endpoint"} type={"url"}
                            placeholder={"https://mastodon.social"} onBlur={e => {
                    const newValue = domainToUrl(e.currentTarget.value);
                    e.currentTarget.value = newValue;
                    setMastodonEndpoint(newValue);
                }}></SmallField>
                <OAuthLink provider={"mastodon"} decentralized={true} endpoint={mastodonEndpoint}></OAuthLink>
                <OAuthLink provider={"linkedin"}></OAuthLink>
                <OAuthLink provider={"instagram"}></OAuthLink>
                <OAuthLink provider={"facebook"}></OAuthLink>
                <Separator></Separator>
                <FormLink href={"/dashboard"} onClick={finishOnboarding}>Continue</FormLink>
            </div>
        </FullScreenOverlayWithCenteredItem>
    </PrivateRoute>;
}
