import React from "react";
import api from "@/helpers/api";

export const UserContext = React.createContext<{ user: IUser | null, refresh: () => void, loaded: boolean, onboard: () => void }>({
    user: null,
    loaded: false,
    refresh() {
    },
    onboard() {
    }
});

export function UserWrapper(props: React.PropsWithChildren<{}>) {
    const [loaded, setLoaded] = React.useState(false);
    const [user, setUser] = React.useState<IUser | null>(null);

    React.useEffect(() => {
        if (!loaded) {
            load().then();
        }
    }, [loaded]);

    async function load() {
        const user = (await api.get<IUser | null>("/user/current")).data;
        setLoaded(true);
        setUser(user);
    }

    function onboard() {
        if (user) {
            user.onboarded = true;
            setUser(user);
        }
    }

    function refresh() {
        setLoaded(false);
    }

    return <UserContext.Provider value={{
        refresh,
        loaded,
        user,
        onboard,
    }}>
        {props.children}
    </UserContext.Provider>
}
