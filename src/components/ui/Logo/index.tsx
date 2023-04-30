import logo from "@/icons/logo.svg";
import classes from "./styles.module.css";
import Link from "next/link";

export default function Logo({href}: {href?: string}) {
    return <Link href={href ?? "/dashboard"} className={classes.logo}>
        <img src={logo.src} alt={"Unifier"} className={classes.logoImage}/>
        <span className={classes.logoText}>Unifier</span>
    </Link>;
}
