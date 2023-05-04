import Logo from "@/components/ui/Logo";
import Toast from "@/components/ui/Toast";
import Link from "next/link";
import CustomLink from "@/components/ui/Link";
import React from "react";
import macbook from "@/assets/macbook.png";
import atlis from "@/icons/providers/atlis.svg";
import twatter from "@/icons/providers/twitter.svg";
import mastodon from "@/icons/providers/mastodon.svg";
import facebook from "@/icons/providers/facebook.svg";
import linkedin from "@/icons/providers/linkedin.svg";
import Image from "next/image";
import Background from "@/components/specific/screens/Background";
import classes from "./landing.module.css";


const SUPPORTED_PROVIDER_ICONS = [
    {name: "Atlis", icon: atlis},
    {name: "Twitter", icon: twatter},
    {name: "Mastodon", icon: mastodon},
    {name: "Facebook", icon: facebook},
    {name: "Linkedin", icon: linkedin}
];

export default function LandingPage() {
    return (
        <>
            <Background></Background>
            <div className={classes.landing}>
                <header className={classes.header}>
                    <nav className={classes.navigation}>
                        <div className={classes.logoLink}>
                            <Logo href={"/"}></Logo>
                            <Toast className={classes.toast}>Beta</Toast>
                        </div>
                        <ul className={classes.navLinks}>
                            <Link href={"/pricing"}>Pricing</Link>
                            <Link href={"https://discord.gg/fkRNFUZP"}>Discord</Link>
                            <CustomLink href={"/login"} className={classes.loginLink}>Log In</CustomLink>
                        </ul>
                    </nav>
                </header>
                <main className={classes.hero}>
                    <div className={classes.heroText}>
                        <h1 className={classes.heroHeading}>
                            Your unified feed for
                            the worldwide web.
                        </h1>
                        <p className={classes.heroDescription}>
                            Streamline your social life without distracting algorithms, connect with all of your
                            favorite people from any platform in one place!
                        </p>
                        <div className={classes.heroButtonFrame}>
                            <CustomLink href={"/signup"} className={classes.heroLink}>Sign Up</CustomLink>
                            <CustomLink href={"/about"} className={`${classes.heroLink} ${classes.focusedHeroLink}`}>Learn
                                More</CustomLink>
                        </div>
                        <ul className={classes.providerIconFrame}>
                            {SUPPORTED_PROVIDER_ICONS.map(icon => {
                                return <li key={icon.icon.src}><Image className={classes.providerIcon} src={icon.icon}
                                                                      alt={icon.name}/>
                                </li>;
                            })}
                        </ul>
                    </div>
                    <div className={classes.heroImageContainer}>
                        <Image src={macbook} alt={"Mockup of Unifier on Macbook Pro 16'"} width={3280} height={1984}
                               className={classes.heroImage}></Image>
                    </div>
                </main>
            </div>
        </>
    );
}
