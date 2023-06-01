import logo from "@/icons/branding/logo.svg";
import Link from "next/link";
import {ReactSVG} from "react-svg";
import classes from "./styles.module.css";

export default function Logo({href, className}: { href?: string, className?: string }) {
    return <Link href={href ?? "/dashboard"} className={`${classes.logo} ${className || ""}`}>
        <ReactSVG src={logo.src} className={classes.logoImage}/>
        <span className={classes.logoText}>Unifier</span>
    </Link>;
}
