export interface Role {
    uid: string;
    role: string;
    createdAt: firebase.default.firestore.Timestamp;
    active: boolean;
}