import { IUserRole } from "app/core/user/user.model";
export interface User {
    uid: string;
    email: string;
    displayName: string;
    role: IUserRole;
    active: boolean;
}
