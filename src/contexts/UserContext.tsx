import React from "react";


export const UserContext = React.createContext<{ user: IUser | null, refresh: () => void }>({
    user: null,
    refresh() {
    }
});

export function UserWrapper(props: React.PropsWithChildren<{}>) {
    const [loaded, setLoaded] = React.useState(false);
    const [user, setUser] = React.useState(null);

    function refresh() {
        setLoaded(false);
    }

    return <UserContext.Provider value={{
        refresh,
        user: null
    }}></UserContext.Provider>
}