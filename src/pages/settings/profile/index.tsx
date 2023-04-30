import React from "react";
import {NextPageWithLayout} from "@/pages/_app";
import SettingsLayout from "@/components/specific/settings/Layout";
import DashboardLayout from "@/components/specific/dashboard/Layout";
import {PrimaryHeading, SecondaryHeading} from "@/components/specific/settings/Heading";
import Section from "@/components/specific/settings/Section";
import Button, {ButtonFrame} from "@/components/specific/settings/Button";
import {UserContext} from "@/contexts/UserContext";
import classes from "./styles.module.css";
import api from "@/helpers/api";
import axios from "axios";
import Image from "next/image";

const ProfileSettings: NextPageWithLayout = function () {
    const {user, refresh} = React.useContext(UserContext);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    async function changeProfilePicture(profilePicture: File) {
        const data = axios.toFormData({
            profile_picture: profilePicture,
        });
        await api.post("/user/profile_picture", data);
        await refresh();
    }

    async function deleteProfilePicture() {
        await api.delete("/user/profile_picture");
        await refresh();
    }

    return <div>
        <PrimaryHeading>My Profile</PrimaryHeading>
        <Section onSubmit={e => {
            e.preventDefault();
        }} className={classes.profilePictureSection}>
            <Image src={user?.profilePictureUrl ?? ""} alt={"Profile picture"} width={128} height={128} className={classes.profilePicture}></Image>
            <div className={classes.profilePictureFormContents}>
                <SecondaryHeading>Profile Picture</SecondaryHeading>
                <p>Your profile picture is displayed everywhere, and helps identify you. Go ahead and put on a bright
                    face!</p>
                <input hidden={true} type={"file"} ref={inputRef} onChange={e => {
                    const files = e.currentTarget?.files;
                    if (files && files.length > 0) {
                        changeProfilePicture(files[0]).then();
                        e.currentTarget.value = "";
                    }
                }} name={"profile_picture"} accept={"image/jpeg,image/png"}/>
                <ButtonFrame>
                    <Button onClick={e => {
                        e.preventDefault();
                        inputRef.current?.click();
                    }}>Change</Button>
                    {user?.profilePictureUrl ? <Button onClick={e => {
                        e.preventDefault();
                        deleteProfilePicture().then();
                    }}>Delete</Button> : null}
                </ButtonFrame>
            </div>
        </Section>
    </div>;
};
export default ProfileSettings;

ProfileSettings.getLayout = function (page) {
    return <>
        <DashboardLayout></DashboardLayout>
        <SettingsLayout>
            {page}
        </SettingsLayout>
    </>;
};
