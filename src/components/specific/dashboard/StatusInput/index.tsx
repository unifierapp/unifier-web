import classes from "./styles.module.css";
import test from "@/defaults/posterIcon.png";
import React from "react";
import {UserContext} from "@/contexts/UserContext";
import Image from "next/image";

export default function StatusInput() {
    const {user} = React.useContext(UserContext);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    function autoResize() {
        if (textareaRef.current && containerRef.current) {
            // Double autoresize to ensure accuracy because of extra scrollbar affecting container width.
            textareaRef.current.style.height = "0px";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
            containerRef.current.style.height = textareaRef.current.scrollHeight + "px";
            textareaRef.current.style.height = "100%";
            textareaRef.current.style.height = "0px";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
            containerRef.current.style.height = textareaRef.current.scrollHeight + "px";
            textareaRef.current.style.height = "100%";
        }
    }

    React.useEffect(() => {
        autoResize();

        window.addEventListener("resize", autoResize);
        return () => window.removeEventListener("resize", autoResize);
    }, []);

    return <form className={classes.inputContainer}>
        <Image width={96} height={96} className={classes.profilePicture} src={user?.profilePictureUrl ?? test.src}
               alt={"Poster"}></Image>
        <label className={classes.label}>
            <div className={classes.textareaContainer} ref={containerRef}>
            <textarea className={classes.textarea} onInput={autoResize}
                      placeholder={"Write something to your connected platforms..."}
                      ref={textareaRef}></textarea>
            </div>
        </label>
    </form>;
}
