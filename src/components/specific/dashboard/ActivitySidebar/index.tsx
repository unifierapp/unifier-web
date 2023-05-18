import React from "react";
import classes from "./styles.module.css";
import Image from "next/image";
import clock from '@/icons/clock.svg';
import defaultProfilePicture from '@/defaults/posterIcon.png';
import {UserContext} from "@/contexts/UserContext";

interface ActivityProps {
    title: string;
    description: string;
    icon?: string;
}

function Activity(props: ActivityProps) {
    return <li className={classes.activity}>
        <Image className={classes.profileIcon} src={props.icon ?? defaultProfilePicture.src} alt={"Poster icon"}
               width={48} height={48}></Image>
        <div className={classes.activityTextContent}>
            <h3 className={classes.activityTitle}>{props.title}</h3>
            <p className={classes.activityDescription}>{props.description}</p>

        </div>
    </li>;
}

export default function ActivitySidebar({mode = "normal"}) {
    const {user} = React.useContext(UserContext);

    return <aside className={classes.sidebar}>
        <div className={classes.header}>
            <Image src={clock} alt={"Recent activity"} className={classes.icon}/>
            <h2>Recent Activity</h2>
        </div>

        <ul>
            <Activity title={user?.displayName ?? ""} description={"has joined Unifier! 🎉"}
                      icon={user?.profilePictureUrl}></Activity>
        </ul>
    </aside>;
}