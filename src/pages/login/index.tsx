import FullScreenOverlayWithCenteredItem from "@/components/layouts/FullScreenOverlayWithCenteredItem";
import SmallField from "@/components/ui/inputs/SmallFormField";
import Separator from "@/components/ui/Separator";
import lock from "@/icons/lock.svg";
import mail from "@/icons/mail.svg";
import classes from "./index.module.css";
import google from "@/icons/providers/google.svg";
import {FormButton} from "@/components/ui/Button";
import {FormLink, OAuthLink} from "@/components/ui/Link";
import React from "react";
import GuestRoute from "@/components/user/GuestRoute";

export default function Login() {
    return <GuestRoute>
        <FullScreenOverlayWithCenteredItem>
            <div className={classes.container}>
                <h1 className={classes.primaryHeading}>Log In</h1>
                <fieldset className={classes.topFields}>
                    <SmallField label={"Email"} icon={mail} name={"email"} type={"email"}
                                placeholder={"example@example.com"}></SmallField>
                    <SmallField label={"Password"} icon={lock} name={"password"} type={"password"}
                                placeholder={"********"}></SmallField>
                </fieldset>
                <Separator></Separator>
                <OAuthLink href={new URL("/auth/google", process.env.NEXT_PUBLIC_BACKEND_URL).toString()} icon={google}>Sign
                    in with
                    Google</OAuthLink>
                <div className={classes.optionalButtons}>
                    <FormButton>Sign in</FormButton>
                    <FormLink href={"/signup"}>No account?</FormLink>
                </div>
            </div>
        </FullScreenOverlayWithCenteredItem>
    </GuestRoute>;
}
