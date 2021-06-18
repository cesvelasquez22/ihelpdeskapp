import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Customer } from '../models/customer.model';

@Injectable()
export class CustomersService {
    constructor(private afs: AngularFirestore, private http: HttpClient) {}

    getAllCustomers() {
        return this.afs
            .collection('customers')
            .snapshotChanges()
            .pipe(
                map((snapshot) => {
                    return snapshot.map((action) => {
                        const data = action.payload.doc.data() as Customer;
                        data.uid = action.payload.doc.id;
                        return data;
                    });
                })
            );
    }

    getCustomerByUid(uid: string) {
        return this.afs
            .collection('customers')
            .doc(uid)
            .valueChanges()
            .pipe(map((customer: any) => customer as Customer));
    }

    updateCustomer(customer: Customer) {
        const customerDocRef = this.afs
            .collection('customers')
            .doc(customer.uid);
        return customerDocRef.update({
            name: customer.displayName,
            email: customer.email,
            department: customer.department,
            active: customer.active,
        });
    }
}
