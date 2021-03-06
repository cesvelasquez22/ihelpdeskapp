import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'app/features/users/models/user.interface';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    Ticket,
    TicketPriority,
    TicketState,
} from '../models/ticket.interface';
import firebase from 'firebase/app';
import {EnumFormat} from '../../../core/models/enum.format';

@Injectable()
export class TicketsService {
    private _ticket: BehaviorSubject<Ticket> = new BehaviorSubject(null);
    public ticket$ = this._ticket.asObservable();

    states = Object.keys(TicketState).map((key) => ({
        key: key,
        label: TicketState[key],
    } as EnumFormat));

    set ticket(ticket: Ticket) {
        this._ticket.next(ticket);
    }

    constructor(private afs: AngularFirestore) {}

    currentState(key: string) {
        return this.states.find((state) => state.key === key);
    }

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

    getAllPriorities() {
        return this.afs
            .collection('priorities')
            .snapshotChanges()
            .pipe(
                map((snapshot) => {
                    return snapshot.map((action) => {
                        const data =
                            action.payload.doc.data() as TicketPriority;
                        data.uid = action.payload.doc.id;
                        return data;
                    });
                })
            );
    }

    getAdminUsers() {
        return this.afs
            .collection('users', (ref) =>
                ref.where('role.name', 'in', ['superAdmin', 'administrator'])
            )
            .snapshotChanges()
            .pipe(
                map((snapshot) => {
                    return snapshot.map((action) => {
                        const data = action.payload.doc.data() as User;
                        data.uid = action.payload.doc.id;
                        return data;
                    });
                })
            );
    }

    createTicket(ticket: Ticket) {
        const docId = this.afs.createId();
        const timestampDate = firebase.firestore.Timestamp.fromDate(
            ticket.createdAt as any
        );
        return this.afs.collection('tickets').doc(docId).set({
            uid: docId,
            subject: ticket.subject,
            description: ticket.description,
            category: ticket.category,
            priority: ticket.priority,
            department: ticket.department,
            customer: ticket.customer,
            createdAt: timestampDate,
            attendedBy: ticket.attendedBy,
            ticketState: ticket.ticketState,
        });
    }

    updateTicket(ticket: Ticket, nextState: string) {
        const ticketDocRef = this.afs.collection('tickets').doc(ticket.uid);
        return ticketDocRef.update({
            ticketState: nextState,
        });
    }
}
