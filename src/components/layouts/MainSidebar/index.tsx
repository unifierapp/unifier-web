import Toast from "@/components/ui/Toast";
import Logo from "@/components/ui/Logo";
import feed from "@/icons/feed.svg";
import profile from "@/icons/profile.svg";
import messages from "@/icons/messages.svg";
import settings from "@/icons/settings.svg";
import changelogs from "@/icons/announcements.svg";
import logout from "@/icons/logout.svg";
import notifications from "@/icons/notifications.svg";
import Link from "next/link";
import React from "react";
import {usePathname} from 'next/navigation';
import classes from "./styles.module.css";
import {UserContext} from "@/contexts/UserContext";

interface SidebarLinkProps {
    href: string,
    icon: { src: string },
    description: string,
    toastClassName?: string
}

const links: SidebarLinkProps[] = [
    {
        href: "/dashboard",
        icon: feed,
        description: "Feed",
    },
    {
        href: "/profile",
        icon: profile,
        description: "Profile",
    },
    {
        href: "/messages",
        icon: messages,
        description: "Messages",
    },
    {
        href: "/notifications",
        icon: notifications,
        description: "Notifications",
    },
];
const miscLinks: SidebarLinkProps[] = [
    {
        href: "/settings",
        icon: settings,
        description: "Settings"
    },
    {
        href: "/changelogs",
        icon: changelogs,
        description: "What's New",
        toastClassName: classes.orangeToast
    },
    // {
    //     href: "/download",
    //     icon: download,
    //     description: "Download App",
    // },
    {
        href: "/logout",
        icon: logout,
        description: "Log Out",
    },
];


function SidebarLink(props: SidebarLinkProps) {
    const path = usePathname();
    const active = path.startsWith(props.href);

    const getToastMapping: Record<string, () => string | number | void> = {
        "/changelogs": () => "New",
    };

    const result = getToastMapping[props.href]?.();
    let toast;
    if (result !== undefined) {
        toast = <Toast className={props.toastClassName}>{result}</Toast>;
    }

    return <li>
        <Link href={props.href} className={`${classes.link} ${active ? classes.activeLink : ""}`}>
            <img src={props.icon.src} alt={props.description}
                 className={`${classes.linkIcon} ${active ? classes.activeLinkIcon : ""}`}/>
            <span className={classes.linkDescription}>{props.description}</span>
            {toast}
        </Link>
    </li>;
}

function Separator() {
    return <div className={classes.separator}></div>;
}

function SidebarLinks(props: { links: SidebarLinkProps[] }) {
    return <ul className={classes.navigationItems}>
        {props.links.map((info) => {
            return <SidebarLink {...info} key={info.href}></SidebarLink>;
        })}
    </ul>;
}

function SidebarAccount() {
<<<<<<< HEAD
    const {user} = React.useContext(UserContext);

    if (user) {
        return <Link href={"/profile"} className={`${classes.link} ${classes.account}`}>
            <img src={user.profilePictureUrl} alt={"Profile picture"}
                 className={`${classes.profilePicture}`}/>
            <span className={classes.linkDescription}>{user.displayName}</span>
        </Link>;
    }

    return null;
=======
    return <Link href={"/profile"} className={`${classes.link} ${classes.account}`}>
        <img src={test.src} alt={"Profile picture"}
             className={`${classes.profilePicture}`}/>
        <span className={classes.linkDescription}>{"username"}</span>
    </Link>;
>>>>>>> d78fdd2cdddef9a39f7da6c528fa84818723df51
}


export default function MainSidebar() {
    return <nav className={classes.sidebar}>
        <div className={classes.sidebarTop}>
            <Logo></Logo>
            <Toast>Beta</Toast>
        </div>
        <SidebarLinks links={links}></SidebarLinks>
        <Separator></Separator>
        <SidebarLinks links={miscLinks}></SidebarLinks>
        <SidebarAccount></SidebarAccount>
    </nav>;
}

