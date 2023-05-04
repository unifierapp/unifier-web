import comment from "@/icons/comment.svg";
import repost from "@/icons/repost.svg";
import like from "@/icons/like.svg";
import classes from "./styles.module.css";
import Image, {StaticImageData} from "next/image";

interface EngagementInfoProps {
    provider: string,
    type: "like" | "repost" | "comment",
    count?: number,
    isActive: boolean,
}

export default function EngagementInfo(props: EngagementInfoProps) {
    const mapping: Record<typeof props.type, StaticImageData> = {like, comment, repost};

    return <button className={classes.engagementInfo}>
        <Image src={mapping[props.type]} alt={props.type.toUpperCase()}/>
        <span>{props.count ?? 0}</span>
    </button>;
}
