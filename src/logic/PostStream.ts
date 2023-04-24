import {PostProps} from "@/components/dashboard/Post";
import api from "@/helpers/api";

export class PostStream {
    account: IAccount;
    streamCursor: {
        min_id?: string,
        max_id?: string,
        since_id?: string,
        limit?: number,
    } = {};

    constructor(account: IAccount) {
        this.account = account;
    }

    async fetch(mode: string = "newer") {
        const query: typeof this.streamCursor = {
            limit: 20,
        };
        if (mode === "newest") {

        } else if (mode === "newer") {
            query.min_id = this.streamCursor.min_id;
        } else if (mode === "older") {
            query.max_id = this.streamCursor.max_id;
        } else {
            throw new Error("Wrong mode.");
        }
        const result = await api.get<RawPost[]>("/post", {
            params: {
                provider: this.account.provider,
                endpoint: this.account.endpoint,
                ...query,
            }
        }).then(res => res.data);
        result.sort((p1, p2) => p2.post_id.localeCompare(p1.post_id));
        console.log(result.map(res => res.post_id));
        if (result.length > 0) {
            if (mode === "newest") {
                this.streamCursor = {};
                this.streamCursor.min_id = result[0].post_id;
                this.streamCursor.max_id = result[result.length - 1].post_id;
            } else if (mode === "newer") {
                this.streamCursor.min_id = result[0].post_id;
            } else if (mode === "older") {
                this.streamCursor.max_id = result[result.length - 1].post_id;
            }
        }
        console.log(this.streamCursor);
        return result.map(rawPost => {
            return {
                connectionInfo: {
                    displayName: rawPost.provider_account.display_name,
                },
                provider: rawPost.provider,
                postData: {
                    providerPostId: rawPost.post_id,
                    content: rawPost.content,
                    lastUpdatedAt: rawPost.created_at,
                    engagements: {
                        likes: rawPost.engagement_stats.likes,
                        reposts: rawPost.engagement_stats.reposts,
                        comments: rawPost.engagement_stats.comments,
                    },
                    attachments: rawPost.attachments,
                },
                isResolved: false,
                providerUserInfo: {
                    userName: rawPost.provider_account.username,
                    id: rawPost.provider_account.id,
                    displayName: rawPost.provider_account.display_name,
                    profileImageUrl: rawPost.provider_account.profile_image_url,
                }
            }
        })
    }
}

export class PostStreamCluster {
    streams: Set<PostStream> = new Set();
    posts: PostProps[] = [];
    running: boolean = false;

    constructor(streams: PostStream[] = []) {
        for (let stream of streams) {
            this.addStream(stream);
        }
    }

    addStream(stream: PostStream) {
        this.streams.add(stream);
    }

    async update(mode = "newer") {
        if (this.running) {
            return;
        }
        this.running = true;
        const promises = Array.from(this.streams).map(stream => stream.fetch(mode));
        const result = (await Promise.all(promises)).flatMap(postStreamResult => postStreamResult);
        result.sort((p1, p2) => +p2.postData.lastUpdatedAt - +p1.postData.lastUpdatedAt);
        if (mode === "newest") {
            this.posts = [];
            this.posts.unshift(...result);
        } else if (mode === "newer") {
            this.posts.unshift(...result);
        } else if (mode === "older") {
            this.posts.push(...result);
        }
        this.running = false;
    }
}