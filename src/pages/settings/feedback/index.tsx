import React from "react";
import {NextPageWithLayout} from "@/pages/_app";
import SettingsLayout from "@/components/specific/settings/Layout";
import DashboardLayout from "@/components/specific/dashboard/Layout";
import {PrimaryHeading, SecondaryHeading} from "@/components/specific/settings/Heading";
import Section from "@/components/specific/settings/Section";
import Button, {ButtonFrame} from "@/components/specific/settings/Button";
import Textarea from "@/components/ui/inputs/Textarea";

const FeedbackDialog: NextPageWithLayout = function () {
    return <div>
        <PrimaryHeading>Send feedback</PrimaryHeading>
        <Section>
            <SecondaryHeading>Feedback</SecondaryHeading>
            <p>Feedback can really help us improve our project and help you have a better experience. It could be anything you have in mind! We promise we won’t let you down.</p>
            <Textarea placeholder={"Tell us what you think here."}></Textarea>
            <ButtonFrame><Button>Send feedback</Button></ButtonFrame>
        </Section>
    </div>;
};
export default FeedbackDialog;

FeedbackDialog.getLayout = function (page) {
    return <DashboardLayout>
        <SettingsLayout>
            {page}
        </SettingsLayout>
    </DashboardLayout>;
};
