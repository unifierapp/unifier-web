import logo from "@/icons/logo.svg";
import classes from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Logo({href, className}: { href?: string, className?: string }) {
    return <Link href={href ?? "/dashboard"} className={`${classes.logo} ${className || ""}`}>
        <Image src={logo} alt={"Unifier"} className={classes.logoImage}/>
        <span className={classes.logoText}>Unifier</span>
    </Link>;
}
