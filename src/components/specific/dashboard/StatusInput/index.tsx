import classes from "./styles.module.css";
import test from "@/debug/posterIcon.png";
import React from "react";

export default function StatusInput() {
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
        <img className={classes.profilePicture} src={test.src} alt={"Poster"}></img>
        <label className={classes.label}>
            <div className={classes.textareaContainer} ref={containerRef}>
            <textarea className={classes.textarea} onInput={autoResize} placeholder={"Write something to your connected platforms..."}
                      ref={textareaRef}></textarea>
            </div>
        </label>
    </form>;
}