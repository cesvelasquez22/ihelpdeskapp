import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.interface';
import firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    private categorieSubject = new BehaviorSubject<Category>(null);
    public category$ = this.categorieSubject.asObservable();

    constructor(private afs: AngularFirestore) {}

    set category(categorie: Category) {
        this.categorieSubject.next(categorie);
    }

    getAllCategories() {
        return this.afs
            .collection('categories')
            .snapshotChanges()
            .pipe(
                map((snapshot) => {
                    return snapshot.map((action) => {
                        const data = action.payload.doc.data() as Category;
                        data.uid = action.payload.doc.id;
                        return data;
                    });
                })
            );
    }

    getCategoryByUid(uid: string) {
        return this.afs
            .collection('categories')
            .doc(uid)
            .valueChanges()
            .pipe(map((categorie: any) => categorie as Category));
    }

    createCategory(category: Category) {
        const docId = this.afs.createId();
        const timestampDate = firebase.firestore.Timestamp.fromDate(category.createdAt as any);
        return this.afs.collection('categories').doc(docId).set({
            uid: docId,
            name: category.name,
            createdAt: timestampDate,
            active: category.active,
        });
    }

    updateCategory(category: Category) {
        const categoryDocRef = this.afs.collection('categories').doc(category.uid);
        return categoryDocRef.update({
            name: category.name,
            active: category.active,
        });
    }

    deleteCategory(uid: string) {
      const customerDocRef = this.afs.collection('categories').doc(uid);
      return customerDocRef.delete();
    }
}
