export interface User
{
    id: string;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
}

export interface IUser {
    uid?: string;
    email?: string;
    password?: string;
    displayName?: string;
    photoURL?: string;
    role?: string;
    active?: boolean;
}

export interface IUserRole {
    uid: string;
    role: string;
    active: boolean;
}

export enum Roles {
    superAdmin = 'superAdmin',
    admin = 'admin',
    customer = 'customer'
}
