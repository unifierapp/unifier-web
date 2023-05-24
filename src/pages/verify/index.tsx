import { useRouter } from 'next/navigation';
import React from 'react';

import FullScreenOverlayWithCenteredItem from '@/components/layouts/FullScreenOverlayWithCenteredItem';
import { FormButton } from '@/components/ui/Button';
import { FormLink } from '@/components/ui/Link';
import Separator from '@/components/ui/Separator';
import PrivateRoute from '@/components/user/PrivateRoute';
import { UserContext } from '@/contexts/UserContext';
import api from '@/helpers/api';
import { resolveMailbox } from '@/helpers/emails';

import classes from './index.module.css';

export default function Verify() {
    const { user, refresh } = React.useContext(UserContext);
    const router = useRouter();

    const [loading, setLoading] = React.useState(false);

    // Account is verified and the user is not trying to change the email address
    React.useEffect(() => {
        if (user?.emailVerified && user.newEmail === user.email) {
            router.push("/dashboard");
        }
    }, [user]);

    // Refreshes the user context every 15 seconds.
    React.useEffect(() => {
        const interval = setInterval(refresh, 15000);
        return () => clearInterval(interval);
    }, [refresh]);

    let resolvedMailbox: string = "";
    if (user?.newEmail) {
        resolvedMailbox = resolveMailbox(user.newEmail);
    }

    return <PrivateRoute>
        <FullScreenOverlayWithCenteredItem>
            <div className={classes.container}>
                <h1 className={classes.primaryHeading}>Verify your email address</h1>
                <p>Check your email address {user?.newEmail} for an email containing the verification link.</p>
                <p>If you do not receive a message, try to request a new email.</p>
                <Separator></Separator>
                {resolvedMailbox ? <FormLink href={resolvedMailbox}>Go to mailbox</FormLink> : null}
                <FormButton loading={loading} onClick={async () => {
                    setLoading(true);
                    await api.post("/auth/resend_confirmation_email");
                    setLoading(false);
                }}>Resend email</FormButton>
            </div>
        </FullScreenOverlayWithCenteredItem>
    </PrivateRoute>;
}
