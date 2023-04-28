import {NextPageWithLayout} from "@/pages/_app";
import React from "react";
import {useRouter} from "next/router";
import {UserContext} from "@/contexts/UserContext";
import api from "@/helpers/api";

const Logout: NextPageWithLayout = function () {
    const router = useRouter();
    const {refresh} = React.useContext(UserContext);

    async function signOut() {
        await api.get("/auth/logout");
        await refresh();
        await router.push("/login")
    }

    React.useEffect(() => {
        signOut();
    }, []);

    return <></>;
}

export default Logout;