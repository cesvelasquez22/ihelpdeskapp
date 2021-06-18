export interface Categorie {
        uid: string;
        category: string;
        createdAt: firebase.default.firestore.Timestamp;
        active: boolean;
        edit?: boolean;
    }
