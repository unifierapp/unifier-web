declare interface IUser {
    _id: string;
    username: string;
    displayName: string;
    email: string;
    emailVerified: boolean;
    newEmail: string;
    profilePictureUrl: string;
    profilePictureCloudId?: string;
    onboarded: boolean;
}

declare interface IAccount {
    _id: string,
    user: string,
    providerAccountId: string,
    provider: string,
    endpoint?: string,
    accessToken: string,
    accessTokenSecret?: string,
    refreshToken?: string,
    displayName: string,
    userName: string,
    internalListId?: string,
}

declare interface RawPost {
    post_id: string;
    provider: string;
    endpoint: string;
    provider_account: {
        username: string;
        id: string;
        display_name: string;
        profile_image_url: string;
    };
    url: string;
    created_at: Date;
    account_id: string;
    content: string;
    attachments: Attachment[],
    engagement_stats: {
        likes: number,
        comments: number,
        reposts: number,
    }
}

declare interface PostResult {
    data: RawPost[],
    pagination: {
        max_id?: string,
        min_id?: string,
    }
}


declare interface Attachment {
    type: string,
    url: string,
    preview_url: string,
}

declare interface IPublicUser extends Omit<IUser, "profilePictureCloudId" | "newEmail" | "emailVerified" | "email" | "onboarded"> {
}

declare interface IPublicAccount extends Omit<IAccount, "internalListId" | "refreshToken" | "accessToken" | "accessTokenSecret"> {
}
