import FullScreenOverlayWithCenteredItem from "@/components/layouts/FullScreenOverlayWithCenteredItem";
import Separator from "@/components/ui/Separator";
import classes from "./index.module.css";
import {FormButton} from "@/components/ui/Button";
import React from "react";
import PrivateRoute from "@/components/user/PrivateRoute";
import {UserContext} from "@/contexts/UserContext";
import {useRouter} from "next/navigation";
import {FormLink} from "@/components/ui/Link";
import {resolveMailbox} from "@/helpers/emails";
import api from "@/helpers/api";

export default function Verify() {
    const {user, refresh} = React.useContext(UserContext);
    const router = useRouter();

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
                <FormButton onClick={async () => {
                    await api.post("/auth/resend_confirmation_email");
                }}>Resend email</FormButton>
            </div>
        </FullScreenOverlayWithCenteredItem>
    </PrivateRoute>;
}
