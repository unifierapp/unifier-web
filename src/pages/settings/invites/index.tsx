import React from "react";
import {NextPageWithLayout} from "@/pages/_app";
import SettingsLayout from "@/components/specific/settings/Layout";
import DashboardLayout from "@/components/specific/dashboard/Layout";
import {PrimaryHeading, SecondaryHeading} from "@/components/specific/settings/Heading";
import Section from "@/components/specific/settings/Section";
import BigFormField from "@/components/ui/inputs/BigFormField";
import Button, {ButtonFrame} from "@/components/specific/settings/Button";

const InviteSettings: NextPageWithLayout = function () {
    return <div>
        <PrimaryHeading>Invite people</PrimaryHeading>
        <Section>
            <SecondaryHeading>Invite</SecondaryHeading>
            <p>Invite some of your peers to make the experience even better.</p>
            <BigFormField placeholder={"example@example.com"} type={"email"} name={"email"}></BigFormField>
            <ButtonFrame><Button>Send invite</Button></ButtonFrame>
        </Section>
    </div>;
};
export default InviteSettings;

InviteSettings.getLayout = function (page) {
    return <>
        <DashboardLayout></DashboardLayout>
        <SettingsLayout>
            {page}
        </SettingsLayout>
    </>;
};
