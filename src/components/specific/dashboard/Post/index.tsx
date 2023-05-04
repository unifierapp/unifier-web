import classes from "./styles.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Attachment, {AttachmentProps} from "@/components/specific/dashboard/Attachment";
import EngagementInfo from "@/components/specific/dashboard/Engagement";
import PostRedirect from "@/components/specific/dashboard/PostRedirect";
import HTMLReactParser from "html-react-parser";
import Image from "next/image";

dayjs.extend(relativeTime);

export interface PostProps {
    connectionInfo?: {
        type: "user" | "localProfile",
        displayName: string,
        profileImageUrl?: string,
        id: string,
    },
    provider: string,
    providerUserInfo: {
        userName: string;
        id: string;
        displayName: string;
        profileImageUrl: string;
    },
    postData: {
        providerPostId: string,
        lastUpdatedAt: Date,
        content: string,
        attachments: AttachmentProps[],
        engagements: {
            likes: number,
            reposts: number,
            comments: number,
        }
    },
    directUrl?: string
}

export default function Post(props: PostProps) {
    if (props.postData) {
        const relativeTime = dayjs(props.postData.lastUpdatedAt).fromNow();

        const attachments = props.postData.attachments;
        const attachmentClassNames = [classes.attachmentGrid];
        if (attachments.length === 2) {
            attachmentClassNames.push(classes.attachmentGrid_2Items);
        }
        const attachmentClassName = attachmentClassNames.join(" ");

        return <article className={classes.postContainer}>
            <Image width={128} height={128}
                   src={props.connectionInfo?.profileImageUrl ?? props.providerUserInfo.profileImageUrl}
                   alt={"Poster icon"}
                   className={classes.profilePicture}></Image>
            <div className={classes.postContent}>
                <div className={classes.postTextContent}>
                    <div className={classes.topBar}>
                        <div className={classes.posterInfo}>
                            <span
                                className={classes.posterName}>{props.connectionInfo?.displayName ?? props.providerUserInfo.displayName}</span>
                            <div className={classes.separator}></div>
                            <span className={classes.relativeTime}>{relativeTime}</span>
                        </div>
                    </div>
                    <div>
                        {HTMLReactParser(props.postData.content)}
                    </div>
                </div>
                {props.postData.attachments.length > 0 ? <div className={attachmentClassName}>
                    {attachments.map((item, index) => {
                        return <Attachment {...item} key={index}></Attachment>;
                    })}
                </div> : null}
                <nav className={classes.stats}>
                    <EngagementInfo provider={props.provider} type={"comment"}
                                    count={props.postData.engagements.comments} isActive={false}></EngagementInfo>
                    <EngagementInfo provider={props.provider} type={"repost"} count={props.postData.engagements.reposts}
                                    isActive={false}></EngagementInfo>
                    <EngagementInfo provider={props.provider} type={"like"} count={props.postData.engagements.likes}
                                    isActive={false}></EngagementInfo>
                    <PostRedirect provider={props.provider} userName={props.providerUserInfo.userName}
                                  postId={props.postData.providerPostId} directUrl={props.directUrl}></PostRedirect>
                </nav>
            </div>
        </article>;
    }
    return null;
}
