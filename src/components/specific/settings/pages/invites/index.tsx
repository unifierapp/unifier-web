import React from 'react';

import Button, { ButtonFrame } from '@/components/specific/settings/components/Button';
import { SecondaryHeading } from '@/components/specific/settings/components/Heading';
import Section from '@/components/specific/settings/components/Section';
import BigFormField from '@/components/ui/inputs/BigFormField';

const InviteSettings = function () {
    const [loading, setLoading] = React.useState(false);

    return <div>
        <Section>
            <SecondaryHeading>Invite</SecondaryHeading>
            <p>Invite some of your peers to make the experience even better.</p>
            <BigFormField placeholder={"example@example.com"} type={"email"} name={"email"}></BigFormField>
            <ButtonFrame><Button loading={loading}>Send invite</Button></ButtonFrame>
        </Section>
    </div>;
};
export default InviteSettings;
