import { useRouter } from 'next/navigation';
import React from 'react';

import FullScreenOverlayWithCenteredItem from '@/components/layouts/FullScreenOverlayWithCenteredItem';
import { FormButton } from '@/components/ui/Button';
import SmallField from '@/components/ui/inputs/SmallFormField';
import { FormLink, OAuthLink } from '@/components/ui/Link';
import Separator from '@/components/ui/Separator';
import { UserContext } from '@/contexts/UserContext';
import api from '@/helpers/api';
import { formToPojo } from '@/helpers/formdata';
import lock from '@/icons/lock.svg';
import mail from '@/icons/mail.svg';
import person from '@/icons/profile.svg';
import google from '@/icons/providers/google.svg';

import classes from './index.module.css';

export default function Signup() {
    const { refresh } = React.useContext(UserContext);
    const router = useRouter();

    const [loading, setLoading] = React.useState(false);

    async function signup(form: HTMLFormElement) {
        setLoading(true);

        const json = formToPojo(form);
        await api.post("/auth/signup", json);
        await refresh();

        setLoading(false);

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
                    placeholder={"Example"}></SmallField>
                <SmallField label={"Username"} icon={mail} name={"username"} type={"text"}
                    placeholder={"example"}></SmallField>
                <SmallField label={"Email"} icon={mail} name={"email"} type={"email"}
                    placeholder={"example@example.com"}></SmallField>
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
                <FormButton loading={loading} type={"submit"}>Sign up</FormButton>
                <FormLink href={"/login"}>Existing user?</FormLink>
            </div>
        </form>
    </FullScreenOverlayWithCenteredItem>;
}
