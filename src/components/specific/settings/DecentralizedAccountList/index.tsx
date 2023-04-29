import React from "react";
import {UserContext} from "@/contexts/UserContext";
import api from "@/helpers/api";
import trash from "@/icons/trash.svg";
import classes from "./styles.module.css";
import Button from "@/components/specific/settings/Button";

function DecentralizedAccount(props: { provider: string, endpoint: string, displayName: string }) {
    const {refresh} = React.useContext(UserContext);

    async function runUnlink() {
        await api.delete("/provider/unlink", {
            params: {
                provider: props.provider,
                endpoint: props.endpoint,
            }
        });
        await refresh();
    }

    return <li className={classes.account}>
        <p className={classes.description}>Connected to {new URL(props.endpoint).host} as {props.displayName}</p>
        <Button onClick={event => {
            event.preventDefault();
            runUnlink().then();
        }} >
            <img src={trash.src} alt={"Unlink this account"}/>
        </Button>
    </li>;
}

export default function DecentralizedAccountList(props: { provider: string }) {
    const {accounts} = React.useContext(UserContext);

    return <ul className={classes.accounts}>
        {accounts.filter(account => {
            console.log(account, account.provider === props.provider && account.endpoint);
            return account.provider === props.provider && account.endpoint;
        }).map(account => {
            return <DecentralizedAccount provider={account.provider} endpoint={account.endpoint!}
                                         displayName={account.displayName} key={account._id}/>;
        })}
    </ul>;
}
