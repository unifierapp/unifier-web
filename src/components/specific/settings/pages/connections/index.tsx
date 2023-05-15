import React from "react";
import Link from "next/link";
import {PrimaryHeading, SecondaryHeading} from "@/components/specific/settings/components/Heading";
import Section from "@/components/specific/settings/components/Section";
import {OAuthLink} from "@/components/user/OAuthLink";
import Grid from "@/components/specific/settings/components/Grid";
import MastodonLinkAccountForm from "@/components/specific/settings/components/LinkAccountForms/mastodon";
import classes from "./styles.module.css";
import DecentralizedAccountList from "@/components/specific/settings/components/DecentralizedAccountList";

const ConnectionSettings = function () {
    return <div>
        <PrimaryHeading>My Account</PrimaryHeading>
        <Section isForm={false}>
            <SecondaryHeading>Centralized Accounts</SecondaryHeading>
            <p>Manage all of your centralized social media accounts, like Twitter, Instagram or Facebook.</p>
            <Grid className={classes.connectionGrid}>
                <OAuthLink provider={"twitter"}></OAuthLink>
                <OAuthLink provider={"facebook"}></OAuthLink>
                <OAuthLink provider={"instagram"} requiresPassword={true}></OAuthLink>
                <OAuthLink provider={"linkedin"} requiresPassword={true}></OAuthLink>
            </Grid>
            <p>Can&apos;t find what you&apos;re looking for? <Link href="/feedback"
                                                                   className={classes.underlineLink}>Suggest a
                platform</Link></p>
        </Section>
        <Section>
            <SecondaryHeading>Mastodon</SecondaryHeading>
            <p>Add and delete decentralized accounts that supports the Mastodon protocol. Only Mastodon websites with
                HTTPS are supported.</p>
            <MastodonLinkAccountForm></MastodonLinkAccountForm>
            <DecentralizedAccountList provider={"mastodon"}></DecentralizedAccountList>
        </Section>
    </div>;
};
export default ConnectionSettings;
