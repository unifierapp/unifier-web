import Toast from "@/components/ui/Toast";
import profile from "@/icons/profile.svg";
import eye from "@/icons/eye.svg";
import paintbrush from "@/icons/paintbrush.svg";
import squares from "@/icons/squares.svg";
import chat from "@/icons/chat.svg";
import money from "@/icons/money.svg";
import voucher from "@/icons/voucher.svg";
import notifications from "@/icons/notifications.svg";
import Link from "next/link";
import React from "react";
import {useSearchParams} from 'next/navigation';
import classes from "./styles.module.css";
import {useRouter} from "next/router";
import Image, {StaticImageData} from "next/image";

interface SidebarLinkProps {
    id: string,
    icon: StaticImageData,
    description: string,
    toastClassName?: string
}

const section1Links: SidebarLinkProps[] = [
    {
        id: "account",
        icon: profile,
        description: "Account",
    },
    {
        id: "profile",
        icon: eye,
        description: "Profile",
    },
    {
        id: "connections",
        icon: squares,
        description: "Connections",
    },
    {
        id: "appearance",
        icon: paintbrush,
        description: "Appearance",
    },
];

const section2Links: SidebarLinkProps[] = [
    {
        id: "invites",
        icon: voucher,
        description: "Invites",
    },
    {
        id: "feedback",
        icon: chat,
        description: "Send feedback",
    },
];


function SidebarLink(props: SidebarLinkProps) {
    const router = useRouter();
    const pathName = router.pathname;
    const params = useSearchParams();
    const active = params.get("modal_type") === "settings" && params.get("settings_tab") === props.id;

    const getToastMapping: Record<string, () => string | number | void> = {
        "changelogs": () => "New",
    };

    const result = getToastMapping[props.id]?.();
    let toast;
    if (result !== undefined) {
        toast = <Toast className={props.toastClassName || ""}>{result}</Toast>;
    }

    return <li>
        <Link href={{
            pathname: pathName,
            query: {
                ...router.query,
                modal_type: "settings",
                settings_tab: props.id,
            }
        }} as={`/settings/${props.id}`} shallow={true}
              className={`${classes.link} ${active ? classes.activeLink : ""}`}>
            <Image src={props.icon} alt={props.description}
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
            return <SidebarLink {...info} key={info.id}></SidebarLink>;
        })}
    </ul>;
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
    </nav>;
}

