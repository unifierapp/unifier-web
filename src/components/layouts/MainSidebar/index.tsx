import classes from "./styles.module.css"
import Logo from "@/components/ui/Logo";
import feed from "@/icons/feed.svg";
import profile from "@/icons/profile.svg"
import posts from "@/icons/posts.svg"
import messages from "@/icons/messages.svg"
import settings from "@/icons/settings.svg"
import experiments from "@/icons/experiments.svg"
import changelogs from "@/icons/changelogs.svg"
import Link from "next/link";

const links = {
    "/dashboard": {
        icon: feed,
        description: "Feed",
    },
    "/profile": {
        icon: profile,
        description: "Profile",
    },
    "/posts": {
        icon: posts,
        description: "Posts",
    },
    "/messages": {
        icon: messages,
        description: "Messages",
    },
    "/settings": {
        icon: settings,
        description: "Settings",
    },
    "/experiments": {
        icon: experiments,
        description: "Experiments",
    },
    "/changelogs": {
        icon: changelogs,
        description: "Changelogs",
    },
}

function SidebarLink(props: { href: string, description: string, icon: { src: string } }) {
    return <li>
        <Link href={props.href} className={classes.link}>
            <img src={props.icon.src} alt={props.description} className={classes.linkIcon}/>
            <span>{props.description}</span>
        </Link>
    </li>
}

export default function MainSidebar() {
    return <nav className={classes.sidebar}>
        <div>
            <Logo></Logo>
        </div>
        <ul className={classes.navigationItems}>
            {Object.entries(links).map(([href, info]) => {
                return <SidebarLink href={href} {...info}></SidebarLink>
            })}
        </ul>
    </nav>
}