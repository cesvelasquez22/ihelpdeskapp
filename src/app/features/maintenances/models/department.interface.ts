export interface Department {
    uid: string;
    name: string;
    createdAt?: firebase.default.firestore.Timestamp;
    active?: boolean;
    edit?: boolean;
}