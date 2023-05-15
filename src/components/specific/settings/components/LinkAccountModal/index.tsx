import {formToJSON} from "axios";
import api from "@/helpers/api";
import FullScreenOverlayWithCenteredItem from "@/components/layouts/FullScreenOverlayWithCenteredItem";
import SmallFormField from "@/components/ui/inputs/SmallFormField";
import person from "@/icons/profile.svg";
import lock from "@/icons/lock.svg";
import Button from "@/components/specific/settings/components/Button";
import React from "react";
import classes from "./styles.module.css";
import {UserContext} from "@/contexts/UserContext";

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
            <SmallFormField icon={person} label={"Username"} name={"username"} type={"username"}></SmallFormField>
            <SmallFormField icon={lock} label={"Password"} name={"password"} type={"password"}></SmallFormField>
            <Button type={"submit"} className={classes.loginButton}>Sign in</Button>
        </form>
    </FullScreenOverlayWithCenteredItem>;
}