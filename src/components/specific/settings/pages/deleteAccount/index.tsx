import { useRouter } from 'next/router';
import { useState } from 'react';

import FullScreenOverlayWithCenteredItem from '@/components/layouts/FullScreenOverlayWithCenteredItem';
import Button from '@/components/specific/settings/components/Button';
import Link from '@/components/specific/settings/components/Link';
import api from '@/helpers/api';

import classes from './styles.module.css';

export default function DeleteAccount() {
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const goBackLink = {
        href: {
            query: {
                ...router.query,
                settings_tab: "account"
            }
        },
        as: "/settings",
    };

    async function deleteAccount() {
        setLoading(true);
        await api.delete("/user");
        setLoading(false);

        location.replace("/");
    }

    return <FullScreenOverlayWithCenteredItem opaqueBackdrop={true} onOuterClick={e => {
        router.push(goBackLink.href, goBackLink.as, {
            shallow: true
        }).then();
    }}>
        <div className={classes.dialog}>
            <h3 className={classes.heading}>
                We&apos;re sad to see you leave!
            </h3>
            <p className={classes.message}>We can not recover any data from your account. Are you sure you want to
                delete it?</p>
            <div className={classes.frame}>
                <Link href={goBackLink.href} as={goBackLink.as} shallow={true} className={classes.button}>Cancel</Link>
                <Button loading={loading} onClick={() => deleteAccount()} className={`${classes.button} ${classes.deleteButton}`}>
                    Delete
                    Account</Button>
            </div>
        </div>
    </FullScreenOverlayWithCenteredItem>;
}