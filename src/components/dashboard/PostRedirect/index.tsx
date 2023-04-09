import linkedin from "@/icons/linkedin.svg";
import twitter from "@/icons/twitter.svg";

export interface PostRedirectProps {
    provider: string;
    userName: string;
    postId: string;
    directUrl?: string;
}

export default function PostRedirect(props: PostRedirectProps) {
    const mapping: Record<string, { url: string, icon: { src: string } }> = {
        twitter: {
            url: `https://twitter.com/${props.userName}/status/${props.postId}`,
            icon: twitter
        },
        linkedin: {
            url: props.directUrl ?? "",
            icon: linkedin
        }
    }

    const data = mapping[props.provider]
    return <a href={data.url}>
        <img src={data.icon.src} alt={`View post on ${props.provider.toUpperCase()}`}></img>
    </a>
}