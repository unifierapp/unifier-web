import React from "react";
import {PrimaryHeading, SecondaryHeading} from "@/components/specific/settings/components/Heading";
import Section from "@/components/specific/settings/components/Section";
import BigFormField from "@/components/ui/inputs/BigFormField";
import Button, {ButtonFrame} from "@/components/specific/settings/components/Button";

const InviteSettings = function () {
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
