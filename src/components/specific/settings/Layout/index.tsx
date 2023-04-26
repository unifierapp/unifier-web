import FullScreenOverlayWithCenteredItem from "@/components/layouts/FullScreenOverlayWithCenteredItem";
import Modal from "@/components/specific/settings/Modal";
import Sidebar from "@/components/specific/settings/Sidebar";
import React from "react";
import Page from "@/components/specific/settings/Page";

export default function SettingsLayout(props: React.PropsWithChildren) {
    return <FullScreenOverlayWithCenteredItem>
        <Modal>
            <Sidebar></Sidebar>
            <Page>{props.children}</Page>
        </Modal>
    </FullScreenOverlayWithCenteredItem>;
}