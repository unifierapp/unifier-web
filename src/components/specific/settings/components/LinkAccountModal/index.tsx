import {formToJSON} from "axios";
import api from "@/helpers/api";
import FullScreenOverlayWithCenteredItem from "@/components/layouts/FullScreenOverlayWithCenteredItem";
import person from "@/icons/profile.svg";
import lock from "@/icons/lock.svg";
import Button from "@/components/specific/settings/components/Button";
import React from "react";
import warn from "@/icons/warn.svg";
import SmallFormField from "@/components/ui/inputs/SmallFormField";
import classes from "./styles.module.css";
import {UserContext} from "@/contexts/UserContext";
import Image from "next/image";

export default function LinkAccountModal(props: {
    provider: string,
    endpoint?: string,
    onOuterClick: () => void,
}) {

    const {refresh} = React.useContext(UserContext);

    async function login(form: HTMLFormElement) {
        const data = formToJSON(form);
        await api.post(`/auth/${props.provider}`, data, {
            params: {
                endpoint: props.endpoint,
            }
        });
        await refresh();
        props.onOuterClick?.();
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
            <Button type={"submit"} className={classes.loginButton}>Sign in</Button>
            <div className={classes.warning}>
                <Image src={warn} alt={"Warning"} className={classes.warnIcon}/>
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