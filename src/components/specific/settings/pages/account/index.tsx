import { formToJSON } from 'axios';
import { useRouter } from 'next/router';
import React from 'react';

import Button, { ButtonFrame } from '@/components/specific/settings/components/Button';
import { SecondaryHeading } from '@/components/specific/settings/components/Heading';
import Link from '@/components/specific/settings/components/Link';
import Section from '@/components/specific/settings/components/Section';
import BigFormField from '@/components/ui/inputs/BigFormField';
import { UserContext } from '@/contexts/UserContext';
import api from '@/helpers/api';

const AccountSettings = function () {
    const [changeEmailLoading, setChangeEmailLoading] = React.useState(false);
    const [changePasswordLoading, setChangePasswordLoading] = React.useState(false);

    const { refresh } = React.useContext(UserContext);
    const { query } = useRouter();

    async function changeEmail(form: HTMLFormElement) {
        setChangeEmailLoading(true);

        const json = formToJSON(form);
        await api.patch("/user/email", json);
        await refresh();

        setChangeEmailLoading(false);
    }

    async function changePassword(form: HTMLFormElement) {
        setChangePasswordLoading(true);

        const json = formToJSON(form);
        try {
            await api.patch("/user/password", json);
        } catch (e) {
        }

        setChangePasswordLoading(false);
    }

    return <div>
        <Section onSubmit={e => {
            e.preventDefault();
            changeEmail(e.currentTarget).then();
        }}>
            <SecondaryHeading>Email</SecondaryHeading>
            <p>Your email helps the system identify your account. Changing the email will disable quick sign in with
                Google on the current email.</p>
            <BigFormField placeholder={user.email} type={"email"} name={"email"}></BigFormField>
            <ButtonFrame><Button loading={changeEmailLoading}>Change</Button></ButtonFrame>
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
            <ButtonFrame><Button loading={changePasswordLoading}>Change</Button></ButtonFrame>
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
