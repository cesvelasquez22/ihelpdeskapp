export interface Department {
    uid: string;
    departmentName: string;
    createdAt: firebase.default.firestore.Timestamp;
    active: boolean;
}