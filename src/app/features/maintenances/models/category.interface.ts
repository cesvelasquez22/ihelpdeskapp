export interface Category {
    uid: string;
    name: string;
    createdAt: firebase.default.firestore.Timestamp;
    active: boolean;
    edit?: boolean;
}
