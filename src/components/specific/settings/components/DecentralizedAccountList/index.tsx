import Image from 'next/image';
import React from 'react';

import Button from '@/components/specific/settings/components/Button';
import { UserContext } from '@/contexts/UserContext';
import api from '@/helpers/api';
import trash from '@/icons/trash.svg';

import classes from './styles.module.css';

function DecentralizedAccount(props: { provider: string, endpoint: string, displayName: string }) {
    const [loading, setLoading] = React.useState(false);

    const { refresh } = React.useContext(UserContext);

    async function runUnlink() {
        setLoading(true);

        await api.delete("/provider/unlink", {
            params: {
                provider: props.provider,
                endpoint: props.endpoint,
            }
        });
        await refresh();

        setLoading(false);
    }

    return <li className={classes.account}>
        <p className={classes.description}>Connected to {new URL(props.endpoint).host} as {props.displayName}</p>
        <Button loading={loading} onClick={event => {
            event.preventDefault();
            runUnlink().then();
        }}>
            <Image src={trash} alt={"Unlink this account"} />
        </Button>
    </li>;
}

export default function DecentralizedAccountList(props: { provider: string }) {
    const { accounts } = React.useContext(UserContext);

    return <ul className={classes.accounts}>
        {accounts.filter(account => {
            return account.provider === props.provider && account.endpoint;
        }).map(account => {
            return <DecentralizedAccount provider={account.provider} endpoint={account.endpoint!}
                displayName={account.displayName} key={account._id} />;
        })}
    </ul>;
}
