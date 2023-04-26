import Toast from "@/components/ui/Toast";
import profile from "@/icons/profile.svg";
import eye from "@/icons/eye.svg";
import paintbrush from "@/icons/paintbrush.svg";
import squares from "@/icons/squares.svg";
import chat from "@/icons/chat.svg"
import money from "@/icons/money.svg";
import voucher from "@/icons/voucher.svg";
import notifications from "@/icons/notifications.svg";
import Link from "next/link";
import React from "react";
import {usePathname} from 'next/navigation';
import classes from "./styles.module.css"

interface SidebarLinkProps {
    href: string,
    icon: { src: string },
    description: string,
    toastClassName?: string
}

const section1Links: SidebarLinkProps[] = [
    {
        href: "/settings/account",
        icon: profile,
        description: "Account",
    },
    {
        href: "/settings/profile",
        icon: eye,
        description: "Profile",
    },
    {
        href: "/settings/connections",
        icon: squares,
        description: "Connections",
    },
    {
        href: "/settings/appearance",
        icon: paintbrush,
        description: "Appearance",
    },
    {
        href: "/settings/notifications",
        icon: notifications,
        description: "Notifications",
    },
    {
        href: "/settings/billing",
        icon: money,
        description: "Billing",
    },
];

const section2Links: SidebarLinkProps[] = [
    {
        href: "/settings/invites",
        icon: voucher,
        description: "Invites",
    },
    {
        href: "/settings/feedback",
        icon: chat,
        description: "Send feedback",
    },
]


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
    </li>
}

function Separator() {
    return <div className={classes.separator}></div>
}

function SidebarLinks(props: { links: SidebarLinkProps[] }) {
    return <ul className={classes.navigationItems}>
        {props.links.map((info) => {
            return <SidebarLink {...info} key={info.href}></SidebarLink>
        })}
    </ul>
}


export default function Sidebar() {
    return <nav className={classes.sidebar}>
        <div className={classes.sidebarTop}>
            <div>
                Settings
            </div>
            <Toast>Beta</Toast>
        </div>
        <SidebarLinks links={section1Links}></SidebarLinks>
        <Separator></Separator>
        <SidebarLinks links={section2Links}></SidebarLinks>
    </nav>
}

