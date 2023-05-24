import { formToJSON } from 'axios';
import Image from 'next/image';
import React from 'react';

import FullScreenOverlayWithCenteredItem from '@/components/layouts/FullScreenOverlayWithCenteredItem';
import Button from '@/components/specific/settings/components/Button';
import SmallFormField from '@/components/ui/inputs/SmallFormField';
import { UserContext } from '@/contexts/UserContext';
import api from '@/helpers/api';
import lock from '@/icons/lock.svg';
import person from '@/icons/profile.svg';
import warn from '@/icons/warn.svg';

import classes from './styles.module.css';

export default function LinkAccountModal(props: {
    provider: string,
    endpoint?: string,
    onOuterClick: () => void,
}) {
    const [loading, setLoading] = React.useState(false);

    const { refresh } = React.useContext(UserContext);

    async function login(form: HTMLFormElement) {
        setLoading(true);

        const data = formToJSON(form);
        await api.post(`/auth/${props.provider}`, data, {
            params: {
                endpoint: props.endpoint,
            }
        });
        await refresh();
        props.onOuterClick?.();

        setLoading(false);
    }

    return <FullScreenOverlayWithCenteredItem className={classes.linkAccountOverlay} opaqueBackdrop={false}
        onOuterClick={() => {
            props.onOuterClick?.();
        }}>
        <form onSubmit={e => {
            e.preventDefault();
            login(e.currentTarget).then();
        }} className={classes.linkAccountModal}>
            <SmallFormField className={classes.signInField} icon={person} label={"Username"} name={"username"}
                type={"username"}></SmallFormField>
            <SmallFormField className={classes.signInField} icon={lock} label={"Password"} name={"password"}
                type={"password"}></SmallFormField>
            <Button loading={loading} type={"submit"} className={classes.loginButton}>Sign in</Button>
            <div className={classes.warning}>
                <Image src={warn} alt={"Warning"} className={classes.warnIcon} />
                <div className={classes.warnText}>
                    <strong className={classes.focus}>Use this feature with discretion as it can cause suspension of
                        your
                        account.</strong>
                    <p>This is an unofficial feature that requires access to your account password to function. Your
                        password will be submitted to our servers, but not stored.</p>
                </div>
            </div>
        </form>
    </FullScreenOverlayWithCenteredItem>;
}