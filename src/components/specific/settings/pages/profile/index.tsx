import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';

import Button, { ButtonFrame } from '@/components/specific/settings/components/Button';
import {
    PrimaryHeading, SecondaryHeading
} from '@/components/specific/settings/components/Heading';
import Section from '@/components/specific/settings/components/Section';
import { UserContext } from '@/contexts/UserContext';
import api from '@/helpers/api';

import classes from './styles.module.css';

const ProfileSettings = function () {
    const [changeProfilePictureLoading, setChangeProfilePictureLoading] = useState(false);
    const [deleteProfilePictureLoading, setDeleteProfilePictureLoading] = useState(false);

    const { user, refresh } = React.useContext(UserContext);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    async function changeProfilePicture(profilePicture: File) {
        setChangeProfilePictureLoading(true);

        const data = axios.toFormData({
            profile_picture: profilePicture,
        });
        await api.post("/user/profile_picture", data);
        await refresh();

        setChangeProfilePictureLoading(false);
    }

    async function deleteProfilePicture() {
        setDeleteProfilePictureLoading(true);

        await api.delete("/user/profile_picture");
        await refresh();

        setDeleteProfilePictureLoading(false);
    }

    return <div>
        <PrimaryHeading>My Profile</PrimaryHeading>
        <Section onSubmit={e => {
            e.preventDefault();
        }} className={classes.profilePictureSection}>
            <Image src={user?.profilePictureUrl ?? ""} alt={"Profile picture"} width={128} height={128}
                className={classes.profilePicture}></Image>
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
                }} name={"profile_picture"} accept={"image/jpeg,image/png"} />
                <ButtonFrame>
                    <Button loading={changeProfilePictureLoading} onClick={e => {
                        e.preventDefault();
                        inputRef.current?.click();
                    }}>Change</Button>
                    {user?.profilePictureUrl ? <Button loading={deleteProfilePictureLoading} onClick={e => {
                        e.preventDefault();
                        deleteProfilePicture().then();
                    }}>Delete</Button> : null}
                </ButtonFrame>
            </div>
        </Section>
    </div>;
};
export default ProfileSettings;
