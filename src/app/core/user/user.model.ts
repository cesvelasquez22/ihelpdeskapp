export interface IUser {
    uid?: string;
    email?: string;
    password?: string;
    displayName?: string;
    photoURL?: string;
    role?: IUserRole;
    active?: boolean;
}

export interface IUserRole {
    uid: string;
    name: string;
    createdAt?: firebase.default.firestore.Timestamp;
    active?: boolean;
}

export enum Roles {
    superAdmin = 'superAdmin',
    admin = 'admin',
    customer = 'customer'
}
