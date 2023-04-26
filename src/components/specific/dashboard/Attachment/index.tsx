import classes from "./styles.module.css";

export interface AttachmentProps {
    type: string,
    url: string,
    alt?: string
}
export default function Attachment(props: AttachmentProps) {
    if (props.type === "image") {
        return <img src={props.url} alt={props.alt} className={classes.attachment}/>
    } else {
        return <video src={props.url} className={classes.attachment}/>
    }
}
