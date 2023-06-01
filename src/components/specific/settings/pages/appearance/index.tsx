import Section from "@/components/specific/settings/components/Section";
import {SecondaryHeading} from "@/components/specific/settings/components/Heading";
import React from "react";
import {MediaContext} from "@/contexts/MediaContext";
import darkMode from "@/assets/ui/dark-mode.svg";
import Image, {StaticImageData} from "next/image";
import classes from './styles.module.css';

interface ThemeButtonProps {
    active: boolean;
    onClick: () => void;
    image: StaticImageData;
    desc: string
}

function ThemeButton(props: ThemeButtonProps) {
    return <li className={classes.themeButtonContainer}>
        <button onClick={(e) => {
            e.preventDefault();
            props.onClick();
        }} className={`${classes.themeButton} ${props.active ? classes.focusedThemeButton : ""}`}>
            <Image className={classes.image} src={darkMode} alt={props.desc}></Image>
            <span>{props.desc}</span>
        </button>
    </li>;
}

export default function AppearanceSettings() {
    const {isUserDark, setIsUserDark} = React.useContext(MediaContext);
    const buttons: ThemeButtonProps[] = [
        {
            active: isUserDark === true,
            image: darkMode,
            desc: "Dark",
            onClick: () => setIsUserDark(true),
        },
        {
            active: isUserDark === false,
            image: darkMode,
            desc: "Light",
            onClick: () => setIsUserDark(false),
        },
        {
            active: isUserDark === undefined,
            image: darkMode,
            desc: "System default",
            onClick: () => setIsUserDark(undefined),
        }
    ];

    return <div>
        <Section>
            <SecondaryHeading>Theme</SecondaryHeading>
            <p>Change your theme to reflect your style!</p>
            <ul className={classes.themeButtons}>
                {buttons.map(button => {
                    return <ThemeButton {...button} key={button.desc}></ThemeButton>;
                })}
            </ul>
        </Section>
    </div>;
}