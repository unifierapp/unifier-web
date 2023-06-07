import React, {PropsWithChildren} from "react";
import classes from './MediaContext.module.css';

export interface MediaContextInfo {
    isDarkMode: boolean;
    isUserDark: boolean | null;
    setIsUserDark: (data: boolean | null) => void;
}

export const MediaContext = React.createContext<MediaContextInfo>({
    isDarkMode: false,
    isUserDark: null,
    setIsUserDark: () => {
    },
});

export function MediaWrapper(props: PropsWithChildren) {
    const [isMediaDark, setIsMediaDark] = React.useState<boolean>(true);
    const [isUserDark, setIsUserDark] = React.useState<boolean | null>(() => null);

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
        try {
            const stringVal = localStorage.getItem("darkMode");
            if (stringVal !== null) {
                setIsUserDark(JSON.parse(stringVal));
            } else {
                setIsUserDark(null);
            }
        } catch (e) {
            setIsUserDark(null);
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