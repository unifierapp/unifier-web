import FullScreenOverlayWithCenteredItem from "@/components/layouts/FullScreenOverlayWithCenteredItem";
import Separator from "@/components/ui/Separator";
import classes from "./index.module.css";
import google from "@/icons/providers/google.svg"
import {FormLink, OAuthLink} from "@/components/ui/Link";
import {getBackendUrl} from "@/helpers/url";

export default function Onboarding() {
    return <FullScreenOverlayWithCenteredItem>
        <div className={classes.container}>
            <h1 className={classes.heading}>Log In</h1>
            <p>Connect your accounts to Unified and start experiencing the power today.</p>
            <OAuthLink href={getBackendUrl("/auth/twitter")} icon={google}>Click to connect Google</OAuthLink>
            <OAuthLink href={getBackendUrl("/auth/twitch")} icon={google}>Click to connect Twitch</OAuthLink>
            <OAuthLink href={getBackendUrl("/auth/mastodon")} icon={google}>Click to connect Mastodon</OAuthLink>
            <OAuthLink href={getBackendUrl("/auth/linkedin")} icon={google}>Click to connect LinkedIn</OAuthLink>
            <OAuthLink href={getBackendUrl("/auth/instagram")} icon={google}>Click to connect Instagram</OAuthLink>
            <OAuthLink href={getBackendUrl("/auth/facebook")} icon={google}>Click to connect Facebook</OAuthLink>
            <Separator></Separator>
            <FormLink href={"/dashboard"}>Continue</FormLink>
        </div>
    </FullScreenOverlayWithCenteredItem>;
}
