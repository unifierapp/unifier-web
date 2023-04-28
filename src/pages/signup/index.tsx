import FullScreenOverlayWithCenteredItem from "@/components/layouts/FullScreenOverlayWithCenteredItem";
import SmallField from "@/components/ui/inputs/SmallFormField";
import Separator from "@/components/ui/Separator";
import lock from "@/icons/lock.svg";
import mail from "@/icons/mail.svg";
import classes from "./index.module.css";
import google from "@/icons/providers/google.svg";
import person from "@/icons/profile.svg";
import {FormButton} from "@/components/ui/Button";
import {FormLink, OAuthLink} from "@/components/ui/Link";
import {formToPojo} from "@/helpers/formdata";
import api from "@/helpers/api";
import React from "react";
import {UserContext} from "@/contexts/UserContext";
import {useRouter} from "next/navigation";

export default function Signup() {
    const {refresh} = React.useContext(UserContext);
    const router = useRouter();
    async function signup(form: HTMLFormElement) {
        const json = formToPojo(form);
        await api.post("/auth/signup", json);
        await refresh();
        router.push("/dashboard");
    }

    return <FullScreenOverlayWithCenteredItem>
        <form className={classes.container} onSubmit={(e) => {
            e.preventDefault();
            signup(e.currentTarget).then();
        }}>
            <h1 className={classes.primaryHeading}>Sign up</h1>
            <fieldset className={classes.topFields}>
                <SmallField label={"Display name"} icon={person} name={"display_name"} type={"text"}
                            placeholder={"Jeremy"}></SmallField>
                <SmallField label={"Username"} icon={mail} name={"username"} type={"text"}
                            placeholder={"username"}></SmallField>
                <SmallField label={"Email"} icon={mail} name={"email"} type={"email"}
                            placeholder={"jeremy@example.com"}></SmallField>
                <SmallField label={"Password"} icon={lock} name={"password"} type={"password"}
                            placeholder={"********"}></SmallField>
                <SmallField label={"Confirm password"} icon={lock} name={"confirm_password"} type={"password"}
                            placeholder={"********"}></SmallField>
            </fieldset>
            <Separator></Separator>
            <OAuthLink href={new URL("/auth/google", process.env.NEXT_PUBLIC_BACKEND_URL).toString()} icon={google}>Sign
                up with
                Google</OAuthLink>
            <div className={classes.optionalButtons}>
                <FormButton type={"submit"}>Sign up</FormButton>
                <FormLink href={"/login"}>Existing user?</FormLink>
            </div>
        </form>
    </FullScreenOverlayWithCenteredItem>;
}
