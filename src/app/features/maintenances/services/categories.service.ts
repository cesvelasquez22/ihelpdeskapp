import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Categorie } from '../models/categorie.interface';
import firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    private categorieSubject = new BehaviorSubject<Categorie>(null);
    public categorie$ = this.categorieSubject.asObservable();

    constructor(private afs: AngularFirestore) {}

    set categorie(categorie: Categorie) {
        this.categorieSubject.next(categorie);
    }

    getAllCategories() {
        return this.afs
            .collection('categories')
            .snapshotChanges()
            .pipe(
                map((snapshot) => {
                    return snapshot.map((action) => {
                        const data = action.payload.doc.data() as Categorie;
                        data.uid = action.payload.doc.id;
                        return data;
                    });
                })
            );
    }

    getCategorieByUid(uid: string) {
        return this.afs
            .collection('categories')
            .doc(uid)
            .valueChanges()
            .pipe(map((categorie: any) => categorie as Categorie));
    }

    createCategorie(categorie: Categorie) {
        const docId = this.afs.createId();
        const timestampDate = firebase.firestore.Timestamp.fromDate(categorie.createdAt as any);
        return this.afs.collection('categories').doc(docId).set({
            uid: docId,
            name: categorie.name,
            createdAt: timestampDate,
            active: categorie.active,
        });
    }

    updateCategorie(categorie: Categorie) {
        const categorieDocRef = this.afs.collection('categories').doc(categorie.uid);
        return categorieDocRef.update({
            name: categorie.name,
            active: categorie.active,
        });
    }

    deleteCategorie(uid: string) {
      const customerDocRef = this.afs.collection('categories').doc(uid);
      return customerDocRef.delete();
    }
}
