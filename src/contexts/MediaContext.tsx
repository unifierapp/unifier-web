import React, {PropsWithChildren} from "react";
import classes from './MediaContext.module.css';

export interface MediaContextInfo {
    isDarkMode: boolean;
    isUserDark?: boolean;
    setIsUserDark: (data?: boolean) => void;
}

export const MediaContext = React.createContext<MediaContextInfo>({
    isDarkMode: false,
    isUserDark: undefined,
    setIsUserDark: () => {
    },
});

export function MediaWrapper(props: PropsWithChildren) {
    const [isMediaDark, setIsMediaDark] = React.useState<boolean>(true);
    const [isUserDark, setIsUserDark] = React.useState<boolean | undefined>(() => undefined);

    React.useEffect(() => {
        function change(e: MediaQueryListEvent) {
            setIsMediaDark(e.matches);
        }

        const query = window.matchMedia("(prefers-color-scheme: dark)");
        query.addEventListener("change", change);
        return () => query.removeEventListener("change", change);
    }, []);

    const isDarkMode = isUserDark ?? isMediaDark;

    React.useEffect(() => {
        if (isDarkMode) {
            document.querySelector("html")!.classList.add('darkMode');
        } else {
            document.querySelector("html")!.classList.remove('darkMode');
        }
    }, [isDarkMode]);

    React.useEffect(() => {
        const stringVal = localStorage.getItem("darkMode");
        if (stringVal !== null) {
            setIsUserDark(JSON.parse(stringVal));
        } else {
            setIsUserDark(undefined);
        }
    }, []);

    React.useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(isUserDark));
    }, [isUserDark]);

    return <MediaContext.Provider value={{
        isDarkMode,
        isUserDark,
        setIsUserDark
    }}>
        <div className={`${classes.container}`}>
            {props.children}
        </div>
    </MediaContext.Provider>;
}