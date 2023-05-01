import React from "react";
import {PrimaryHeading, SecondaryHeading} from "@/components/specific/settings/components/Heading";
import Section from "@/components/specific/settings/components/Section";
import Button, {ButtonFrame} from "@/components/specific/settings/components/Button";
import Textarea from "@/components/ui/inputs/Textarea";

const FeedbackDialog = function () {
    return <div>
        <PrimaryHeading>Send feedback</PrimaryHeading>
        <Section>
            <SecondaryHeading>Feedback</SecondaryHeading>
            <p>Feedback can really help us improve our project and help you have a better experience. It could be
                anything you have in mind! We promise we won’t let you down.</p>
            <Textarea placeholder={"Tell us what you think here."}></Textarea>
            <ButtonFrame><Button>Send feedback</Button></ButtonFrame>
        </Section>
    </div>;
};
export default FeedbackDialog;
