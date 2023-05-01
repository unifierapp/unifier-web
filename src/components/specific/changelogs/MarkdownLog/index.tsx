import ReactMarkdown from "react-markdown";
import React from "react";
import rehypeRaw from "rehype-raw";
import classes from "./styles.module.css";

export default function MarkdownLog(props: {
    data: string
}) {
    return <ReactMarkdown rehypePlugins={[rehypeRaw]} className={classes.markdown}>{props.data}</ReactMarkdown>;
};