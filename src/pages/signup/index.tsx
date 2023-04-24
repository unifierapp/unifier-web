import FullScreenOverlayWithCenteredItem from "@/components/layouts/FullScreenOverlayWithCenteredItem";
import SmallField from "@/components/ui/inputs/SmallFormField";
import Separator from "@/components/ui/Separator";
import lock from "@/icons/lock.svg";
import mail from "@/icons/mail.svg"
import classes from "./index.module.css";
import google from "@/icons/providers/google.svg"
import  {FormButton} from "@/components/ui/Button";
import {FormLink, OAuthLink} from "@/components/ui/Link";

export default function Signup() {
    return <FullScreenOverlayWithCenteredItem>
        <div className={classes.container}>
            <h1 className={classes.heading}>Sign up</h1>
            <fieldset className={classes.topFields}>
                <SmallField label={"Username"} icon={mail} name={"username"} type={"text"}
                            placeholder={"jeremy"}></SmallField>
                <SmallField label={"Email"} icon={mail} name={"email"} type={"email"}
                            placeholder={"example@example.com"}></SmallField>
                <SmallField label={"Password"} icon={lock} name={"password"} type={"password"}
                            placeholder={"********"}></SmallField>
                <SmallField label={"Confirm password"} icon={lock} name={"confirm_password"} type={"password"}
                            placeholder={"********"}></SmallField>
            </fieldset>
            <Separator></Separator>
            <OAuthLink href={new URL("/auth/google", process.env.NEXT_PUBLIC_BACKEND_URL).toString()} icon={google}>Sign up with
                Google</OAuthLink>
            <div className={classes.optionalButtons}>
                <FormButton>Sign up</FormButton>
                <FormLink href={"/login"}>Existing user?</FormLink>
            </div>
        </div>
    </FullScreenOverlayWithCenteredItem>;
}
