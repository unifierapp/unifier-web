import React from "react";
import {NextPageWithLayout} from "@/pages/_app";
import SettingsLayout from "@/components/specific/settings/Layout";
import DashboardLayout from "@/components/specific/dashboard/Layout";
import {PrimaryHeading, SecondaryHeading} from "@/components/specific/settings/Heading";
import Section from "@/components/specific/settings/Section";
import {OAuthLink} from "@/components/user/OAuthLink";
import BigFormField from "@/components/ui/inputs/BigFormField";
import Grid from "@/components/specific/settings/Grid";
import {InputAndButtonContainer} from "@/components/specific/settings/Input";
import MastodonLinkAccountForm from "@/components/specific/settings/LinkAccountForms/mastodon";

const ConnectionSettings: NextPageWithLayout = function () {
    return <div>
        <PrimaryHeading>My Account</PrimaryHeading>
        <Section>
            <SecondaryHeading>Centralized Accounts</SecondaryHeading>
            <p>Manage all of your centralized social media accounts, like Twitter, Instagram or Facebook.</p>
            <Grid columns={2}>
                <OAuthLink provider={"twitter"}></OAuthLink>
                <OAuthLink provider={"facebook"}></OAuthLink>
                <OAuthLink provider={"instagram"}></OAuthLink>
                <OAuthLink provider={"linkedin"}></OAuthLink>
            </Grid>
            <p>Can&apos;t find what you&apos;re looking for? <Link href="/settings/feedback">Suggest a platform</Link></p>
        </Section>
        <Section>
            <SecondaryHeading>Mastodon</SecondaryHeading>
            <p>Add and delete decentralized accounts that supports the Mastodon protocol. Only Mastodon websites with HTTPS are supported.</p>
            <MastodonLinkAccountForm></MastodonLinkAccountForm>
        </Section>
    </div>;
};
export default ConnectionSettings;

ConnectionSettings.getLayout = function (page) {
    return <DashboardLayout>
        <SettingsLayout>
            {page}
        </SettingsLayout>
    </DashboardLayout>;
};
