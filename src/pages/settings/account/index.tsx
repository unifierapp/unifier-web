import React from "react";
import {NextPageWithLayout} from "@/pages/_app";
import SettingsLayout from "@/components/specific/settings/Layout";
import DashboardLayout from "@/components/specific/dashboard/Layout";
import {PrimaryHeading, SecondaryHeading} from "@/components/specific/settings/Heading";
import Section from "@/components/specific/settings/Section";
import BigFormField from "@/components/ui/inputs/BigFormField";
import Button, {ButtonFrame} from "@/components/specific/settings/Button";

const AccountSettings: NextPageWithLayout = function () {
    return <div>
        <PrimaryHeading>My Account</PrimaryHeading>
        <Section>
            <SecondaryHeading>Email</SecondaryHeading>
            <p>Your email helps the system identify your account. Changing the email will disable quick sign in with Google on the current email.</p>
            <BigFormField placeholder={"jeremy@unifier.app"} type={"email"} name={"email"}></BigFormField>
            <ButtonFrame><Button>Change</Button></ButtonFrame>
        </Section>
        <Section>
            <SecondaryHeading>Password</SecondaryHeading>
            <p>Change your password by filling this form if you think it's not secure enough.</p>
            <BigFormField placeholder={"Current password"} type={"password"} name={"old_password"}></BigFormField>
            <BigFormField placeholder={"New password"} type={"password"} name={"new_password"}></BigFormField>
            <BigFormField placeholder={"Confirm password"} type={"password"} name={"confirm_password"}></BigFormField>
            <ButtonFrame><Button>Change</Button></ButtonFrame>
        </Section>
    </div>;
}
export default AccountSettings;

AccountSettings.getLayout = function (page) {
    return <DashboardLayout>
        <SettingsLayout>
            {page}
        </SettingsLayout>
    </DashboardLayout>
}
