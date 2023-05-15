import React from "react";
import api from "@/helpers/api";
import defaultProfilePicture from "@/defaults/posterIcon.png";

export const UserContext = React.createContext<{ user: IUser | null, accounts: IAccount[], refresh: () => void, loaded: boolean, onboard: () => void }>({
    user: null,
    loaded: false,
    accounts: [],
    refresh() {
    },
    onboard() {
    },
});

export function UserWrapper(props: React.PropsWithChildren<{}>) {
    const [loaded, setLoaded] = React.useState(false);
    const [user, setUser] = React.useState<IUser | null>(null);
    const [accounts, setAccounts] = React.useState<IAccount[]>([]);

    console.log(user);

    React.useEffect(() => {
        if (!loaded) {
            load().then();
        }
    }, [loaded]);

    async function load() {
        const user = (await api.get<IUser | null>("/user/current")).data;
        setLoaded(true);
        if (user && !user.profilePictureUrl) {
            user.profilePictureUrl = defaultProfilePicture.src;
        }
        setUser(user);
        if (user && user.emailVerified) {
            const accounts = await api.get<IAccount[]>("/provider/get_all").then(res => res.data);
            setAccounts(accounts);
        } else {
            setAccounts([]);
        }
    }

    function onboard() {
        if (user) {
            user.onboarded = true;
            setUser(user);
        }
    }

    async function refresh() {
        await load();
    }

    return <UserContext.Provider value={{
        refresh,
        accounts,
        loaded,
        user,
        onboard,
    }}>
        {props.children}
    </UserContext.Provider>;
}
