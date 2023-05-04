import React from "react";
import {PrimaryHeading, SecondaryHeading} from "@/components/specific/settings/components/Heading";
import Section from "@/components/specific/settings/components/Section";
import BigFormField from "@/components/ui/inputs/BigFormField";
import Button, {ButtonFrame} from "@/components/specific/settings/components/Button";
import api from "@/helpers/api";
import {formToJSON} from "axios";
import {UserContext} from "@/contexts/UserContext";
import Link from "@/components/specific/settings/components/Link";
import {useRouter} from "next/router";

const AccountSettings = function () {
    const {refresh} = React.useContext(UserContext);
    const {query} = useRouter();

    async function changeEmail(form: HTMLFormElement) {
        const json = formToJSON(form);
        await api.patch("/user/email", json);
        await refresh();
    }

    async function changePassword(form: HTMLFormElement) {
        const json = formToJSON(form);
        try {
            await api.patch("/user/password", json);
        } catch (e) {
        }
    }

    return <div>
        <PrimaryHeading>My Account</PrimaryHeading>
        <Section onSubmit={e => {
            e.preventDefault();
            changeEmail(e.currentTarget).then();
        }}>
            <SecondaryHeading>Email</SecondaryHeading>
            <p>Your email helps the system identify your account. Changing the email will disable quick sign in with
                Google on the current email.</p>
            <BigFormField placeholder={"example@example.com"} type={"email"} name={"email"}></BigFormField>
            <ButtonFrame><Button>Change</Button></ButtonFrame>
        </Section>
        <Section onSubmit={e => {
            e.preventDefault();
            changePassword(e.currentTarget).then();
        }}>
            <SecondaryHeading>Password</SecondaryHeading>
            <p>Change your password by filling this form if you think it&apos;s not secure enough.</p>
            <BigFormField placeholder={"Current password"} type={"password"} name={"old_password"}></BigFormField>
            <BigFormField placeholder={"New password"} type={"password"} name={"new_password"}></BigFormField>
            <BigFormField placeholder={"Confirm password"} type={"password"} name={"confirm_password"}></BigFormField>
            <ButtonFrame><Button>Change</Button></ButtonFrame>
        </Section>
        <Section>
            <SecondaryHeading>Danger Zone</SecondaryHeading>
            <p>Make changes to your account. Some or all of your data will be lost.</p>
            <ButtonFrame><Link href={{
                query: {
                    ...query,
                    settings_tab: "delete_account",
                }
            }} shallow={true} as={"/settings/delete_account"}>Delete account</Link></ButtonFrame>
        </Section>
    </div>;
};
export default AccountSettings;
