import { useRouter } from 'next/router';
import React from 'react';

import FullScreenOverlayWithCenteredItem from '@/components/layouts/FullScreenOverlayWithCenteredItem';
import Modal from '@/components/specific/settings/components/Modal';
import Page from '@/components/specific/settings/components/Page';
import Sidebar from '@/components/specific/settings/components/Sidebar';
import AccountSettings from '@/components/specific/settings/pages/account';
import ConnectionSettings from '@/components/specific/settings/pages/connections';
import DeleteAccount from '@/components/specific/settings/pages/deleteAccount';
import FeedbackDialog from '@/components/specific/settings/pages/feedback';
import InviteSettings from '@/components/specific/settings/pages/invites';
import ProfileSettings from '@/components/specific/settings/pages/profile';

export default function SettingsLayout() {
    const router = useRouter();

    const mappings: Record<string, {
        title?: string;
        element: (props: {}) => JSX.Element
    }> = {
        account: {
            element: AccountSettings
        },
        profile: {
            title: "My Profile",
            element: ProfileSettings
        },
        connections: {
            element: ConnectionSettings
        },
        invites: {
            title: "Invite people",
            element: InviteSettings
        },
        feedback: {
            title: "Send feedback",
            element: FeedbackDialog
        },
        delete_account: {
            element: DeleteAccount
        },
    };

    let Component;
    const settingsTab = router.query.settings_tab;
    if (typeof settingsTab !== "string") {
        Component = AccountSettings;
    } else {
        Component = mappings[settingsTab].element ?? AccountSettings;
    }

    return <FullScreenOverlayWithCenteredItem opaqueBackdrop={false} onOuterClick={e => {
        router.push({
            query: {
                ...router.query,
                modal_type: undefined,
                settings_tab: undefined,
            }
        }, undefined, {
            shallow: true,
        }).then();
    }}>
        <Modal>
            <Sidebar></Sidebar>
            <Page title={mappings[settingsTab?.toString() ?? ''].title}><Component /></Page>
        </Modal>
    </FullScreenOverlayWithCenteredItem>;
}
