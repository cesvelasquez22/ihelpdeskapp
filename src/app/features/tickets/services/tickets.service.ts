import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ticket } from '../models/ticket.interface';

@Injectable()
export class TicketsService {
    private _ticket: BehaviorSubject<Ticket> = new BehaviorSubject(null);
    public ticket$ = this._ticket.asObservable();

    set ticket(ticket: Ticket) {
        this._ticket.next(ticket);
    }

    constructor(private afs: AngularFirestore) {}

    getAllTickets() {
        return this.afs
            .collection('tickets')
            .snapshotChanges()
            .pipe(
                map((snapshot) => {
                    return snapshot.map((action) => {
                        const data = action.payload.doc.data() as Ticket;
                        data.uid = action.payload.doc.id;
                        return data;
                    });
                })
            );
    }
}
