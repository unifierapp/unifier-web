import {PostProps} from "@/components/specific/dashboard/Post";
import api from "@/helpers/api";
import {AxiosError} from "axios";

export class PostStream {
    account: IAccount;
    type: string = "home";
    profile?: IPublicUser;
    streamCursor: {
        min_id?: string,
        max_id?: string,
        since_id?: string,
        limit?: number,
        user_id?: string,
    } = {};

    constructor(account: IAccount, type: string, profile?: IPublicUser) {
        this.account = account;
        if (type === "user" && !profile) {
            throw new Error("Missing profile for user timeline.");
        }
        this.type = type;
        this.profile = profile;
    }

    async fetch(mode: string = "newer"): Promise<PostProps[]> {
        const query: typeof this.streamCursor = {
            limit: 20,
        };
        let url = "/post";
        if (this.type === "user") {
            url = "/post/user";
            query.user_id = this.profile?._id;
        }
        if (mode === "newest") {
        } else if (mode === "newer") {
            query.min_id = this.streamCursor.min_id;
        } else if (mode === "older") {
            query.max_id = this.streamCursor.max_id;
        } else {
            throw new Error("Wrong mode.");
        }
        let result: RawPost[];
        try {
            result = await api.get<RawPost[]>(url, {
                params: {
                    provider: this.account.provider,
                    endpoint: this.account.endpoint,
                    ...query,
                }
            }).then(res => res.data);
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.status === 404) {
                    return [];
                }
            }
            throw e;
        }
        result.sort((p1, p2) => p2.post_id.localeCompare(p1.post_id));
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
        return result.map(rawPost => {
            return {
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
                directUrl: rawPost.url,
                providerUserInfo: {
                    userName: rawPost.provider_account.username,
                    id: rawPost.provider_account.id,
                    displayName: rawPost.provider_account.display_name,
                    profileImageUrl: rawPost.provider_account.profile_image_url,
                }
            };
        });
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
        try {
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
        } finally {
            this.running = false;
        }
    }
}
