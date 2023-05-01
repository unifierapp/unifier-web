import {NextPageWithLayout} from "@/pages/_app";
import DashboardLayout from "@/components/specific/dashboard/Layout";
import classes from "./styles.module.css";
import PostViewer from "@/components/specific/dashboard/PostViewer";
import React from "react";
import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from "next";
import api from "@/helpers/api";
import {AxiosError} from "axios";

interface ProfileProps {
    user: PublicUser,
    accounts: PublicAccount[],
}

const Profile: NextPageWithLayout = function (props: PublicUser) {
    return <>
        <>
            <section className={classes.welcomeSection}>
                <div className={classes.welcomeSectionLeft}>
                    <h1 className={classes.welcomeHeading}>Welcome back,</h1>
                    <p>Let&apos;s see what the people you follow are up to today!</p>
                </div>
            </section>
            <PostViewer></PostViewer>
        </>
    </>;
}

Profile.getLayout = function (page) {
    return <DashboardLayout>
        {page}
    </DashboardLayout>;
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ProfileProps>> {
    try {
        const username = context.params.username;
        if (!username) {
            return {
                notFound: true,
            }
        }
        const profileProps: ProfileProps = (await api.get<ProfileProps>(`/user/lookup/${username}`)).data;
        return {
            props: profileProps,
        }
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 404) {
            return {
                notFound: true,
            }
        }
        throw e;
    }
}

export default Profile;
