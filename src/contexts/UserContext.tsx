"use client";
import React from "react";
import api from "@/helpers/api";

export const UserContext = React.createContext<{ user: IUser | null, refresh: () => void }>({
    user: null,
    refresh() {},
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
        const user = (await api.get<IUser | null>("/users/current")).data;
        setUser(user);
    }

    function refresh() {
        setLoaded(false);
    }

    return <UserContext.Provider value={{
        refresh,
        user,
    }}></UserContext.Provider>
}
