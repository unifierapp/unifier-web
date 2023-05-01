import FullScreenOverlayWithCenteredItem from "@/components/layouts/FullScreenOverlayWithCenteredItem";
import Modal from "@/components/specific/settings/components/Modal";
import Sidebar from "@/components/specific/settings/components/Sidebar";
import React from "react";
import Page from "@/components/specific/settings/components/Page";
import {useRouter} from "next/router";
import AccountSettings from "@/components/specific/settings/pages/account";
import ProfileSettings from "@/components/specific/settings/pages/profile";
import ConnectionSettings from "@/components/specific/settings/pages/connections";
import InviteSettings from "@/components/specific/settings/pages/invites";
import FeedbackDialog from "@/components/specific/settings/pages/feedback";

export default function SettingsLayout() {
    const router = useRouter();

    const mappings: Record<string, (props: {}) => React.ReactNode> = {
        account: AccountSettings,
        profile: ProfileSettings,
        connections: ConnectionSettings,
        invites: InviteSettings,
        feedback: FeedbackDialog,
    };

    const Component = mappings[router.query.settings_tab] ?? AccountSettings;

    return <FullScreenOverlayWithCenteredItem opaqueBackdrop={false} onOuterClick={e => {
        router.push("?").then();
    }}>
        <Modal>
            <Sidebar></Sidebar>
            <Page>{<Component/>}</Page>
        </Modal>
    </FullScreenOverlayWithCenteredItem>;
}
