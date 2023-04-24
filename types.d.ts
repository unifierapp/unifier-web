declare interface IUser {
    _id: string;
    username: string;
    email: string;
    profilePictureUrl: string;
    profilePictureCloudId?: string;
    onboarded: boolean;
}
