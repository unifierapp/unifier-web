import classes from "./styles.module.css";

interface AttachmentVariant {
    content_type: string,
    url: string,
    bit_rate?: number,
}

export interface AttachmentProps {
    type: string,
    url: string,
    alt?: string,
    variants?: AttachmentVariant[],
}

export default function Attachment(props: AttachmentProps) {
    if (props.type === "video") {
        return <video className={classes.attachment} controls={true}>
            {props.variants ? props.variants.map(variant => {
                return <source src={variant.url} type={variant.content_type} key={variant.url}/>;
            }) : null}
        </video>;
    } else if (props.type === "animated_gif") {
        return <video className={classes.attachment} autoPlay={true} loop={true}>
            {props.variants ? props.variants.map(variant => {
                return <source src={variant.url} type={variant.content_type} key={variant.url}/>;
            }) : null}
        </video>;
    } else {
        return <img src={props.url} alt={props.alt} className={classes.attachment}/>;
    }
}
