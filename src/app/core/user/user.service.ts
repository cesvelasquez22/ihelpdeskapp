import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IUserRole } from 'app/core/user/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
    providedIn: 'root',
})
export class UserService {
    /**
     * Constructor
     */
    constructor(
        private afs: AngularFirestore,
    ) {}

    getDefaultRole() {
        return this.afs
            .collection('roles', ref => ref.where('name', '==', 'customer'))
            .snapshotChanges()
            .pipe(
                map((snapshot) => {
                    return snapshot.map((action) => {
                        const data = action.payload.doc.data() as IUserRole;
                        data.uid = action.payload.doc.id;
                        return data;
                    });
                })
            );
    }
}
