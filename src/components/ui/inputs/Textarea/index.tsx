import classes from "./styles.module.css";
import React from "react";
import {element} from "prop-types";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentPropsWithoutRef<"textarea">>(function Textarea(props, ref) {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    function autoResize() {
        const textarea = textareaRef.current;
        const container = containerRef.current;
        if (textarea && container) {
            // Double autoresize to ensure accuracy because of extra scrollbar affecting container width.
            textarea.style.height = "0px";
            textarea.style.height = textarea.scrollHeight + "px";
            container.style.height = textarea.scrollHeight + "px";
            textarea.style.height = "100%";
            textarea.style.height = "0px";
            textarea.style.height = textarea.scrollHeight + "px";
            container.style.height = textarea.scrollHeight + "px";
            textarea.style.height = "100%";
        }
    }

    React.useEffect(() => {
        autoResize();

        window.addEventListener("resize", autoResize);
        return () => window.removeEventListener("resize", autoResize);
    }, []);

    return <label className={classes.label}>
        <div className={classes.textareaContainer} ref={containerRef}>
            <textarea {...props} onInput={e => {
                e.preventDefault();
                autoResize();
                props.onInput?.(e);
            }} ref={e => {
                textareaRef.current = e;
                if (typeof ref === "function") {
                    ref(e);
                } else if (ref) {
                    ref.current = e;
                }
            }} className={`${classes.textarea} ${props.className || ""}`}></textarea>
        </div>
    </label>;
});

export default Textarea;
