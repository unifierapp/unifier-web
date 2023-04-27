import FullScreenOverlayWithCenteredItem from "@/components/layouts/FullScreenOverlayWithCenteredItem";
import Modal from "@/components/specific/settings/Modal";
import Sidebar from "@/components/specific/settings/Sidebar";
import React from "react";
import Page from "@/components/specific/settings/Page";
import {useRouter} from "next/navigation";

export default function SettingsLayout(props: React.PropsWithChildren) {
    const router = useRouter();

    return <FullScreenOverlayWithCenteredItem opaqueBackdrop={false} onOuterClick={e => {
        router.push("/dashboard");
    }}>
        <Modal>
            <Sidebar></Sidebar>
            <Page>{props.children}</Page>
        </Modal>
    </FullScreenOverlayWithCenteredItem>;
}