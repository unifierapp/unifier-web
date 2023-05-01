import Toast from "@/components/ui/Toast";
import Logo from "@/components/ui/Logo";
import feed from "@/icons/feed.svg";
import profile from "@/icons/profile.svg";
import settings from "@/icons/settings.svg";
import changelogs from "@/icons/announcements.svg";
import logout from "@/icons/logout.svg";
import Link from "next/link";
import React from "react";
import {usePathname} from 'next/navigation';
import classes from "./styles.module.css";
import {UserContext} from "@/contexts/UserContext";
import {useRouter} from "next/router";
import {UrlObject} from "url";

interface SidebarLinkProps {
    href: string | UrlObject,
    as?: string,
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
];
const miscLinks: SidebarLinkProps[] = [
    {
        href: {
            query: {
                modal_type: "settings",
                settings_tab: "account",
            }
        },
        as: "/settings",
        icon: settings,
        description: "Settings"
    },
    {
        href: "/changelogs",
        icon: changelogs,
        description: "What's New",
        toastClassName: classes.orangeToast
    },
    {
        href: "/logout",
        icon: logout,
        description: "Log Out",
    },
];

function SidebarLink(props: SidebarLinkProps) {
    const router = useRouter();
    const path = usePathname() ?? "";
    const href: UrlObject = typeof props.href === "string" ? {pathname: props.href} : props.href;
    const displayedHref = props.as ?? href.pathname;
    const active = displayedHref ? path.startsWith(displayedHref) : false;

    const getToastMapping: Record<string, () => string | number | void> = {
        "/changelogs": () => "New",
    };

    const result = getToastMapping[props.href.toString()]?.();
    let toast;
    if (result !== undefined) {
        toast = <Toast className={props.toastClassName || ""}>{result}</Toast>;
    }

    return <Link as={props.as ?? undefined} shallow={!!props.as} href={{
        ...href,
        query: {
            ...router.query,
            ...(typeof href.query === "object" && href.query ? href.query : {}),
        }
    }}
                 className={`${classes.link} ${active ? classes.activeLink : ""}`}>
        <img src={props.icon.src} alt={props.description}
             className={`${classes.linkIcon} ${active ? classes.activeLinkIcon : ""}`}/>
        <span className={classes.linkDescription}>{props.description}</span>
        {toast}
    </Link>;
}

function Separator() {
    return <div className={classes.separator}></div>;
}

function SidebarLinks(props: { links: SidebarLinkProps[] }) {
    return <ul className={classes.navigationItems}>
        {props.links.map((info, index) => {
            return <li>
                <SidebarLink {...info} key={index}></SidebarLink>
            </li>;
        })}
    </ul>;
}

function SidebarAccount() {
    const {user} = React.useContext(UserContext);

    if (user) {
        return <Link href={"/profile"} className={`${classes.link} ${classes.account}`}>
            <img src={user.profilePictureUrl} alt={"Profile picture"}
                 className={`${classes.profilePicture}`}/>
            <span className={classes.linkDescription}>{user.displayName}</span>
        </Link>;
    }

    return null;
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

