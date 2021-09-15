import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsService } from '../../services/tickets.service';
import { TicketsComponent } from '../tickets/tickets.component';
import { Observable } from 'rxjs';
import { Ticket, TicketState } from '../../models/ticket.interface';
import { tap } from 'rxjs/operators';
import { IzitoastAlertService } from 'app/core/alerts/izitoast-alert.service';
import {EnumFormat} from '../../../../core/models/enum.format';

@Component({
    selector: 'app-ticket-preview',
    templateUrl: './ticket-preview.component.html',
    styleUrls: ['./ticket-preview.component.scss'],
})
export class TicketPreviewComponent implements OnInit {
    public ticket$ = new Observable<Ticket>();
    loading: boolean = false;

    //
    // ─── STATES ─────────────────────────────────────────────────────────────────────
    //
    states = Object.keys(TicketState).map((key) => ({
        key: key,
        label: TicketState[key],
    } as EnumFormat));
    nextState: EnumFormat;

    constructor(
        private ticketsComponent: TicketsComponent,
        private router: Router,
        private ticketsService: TicketsService,
        private location: Location,
        private route: ActivatedRoute,
        private izitoastAlertService: IzitoastAlertService,
    ) {}

    ngOnInit(): void {
        console.log(this.states);
        this.ticket$ = this.ticketsService.ticket$.pipe(
            tap((ticket) => {
                if (ticket) {
                    this.ticketsComponent.matDrawer.open();
                } else {
                    const route = this.route;
                    this.router.navigate(['../'], { relativeTo: route });
                }
            })
        );
    }

    currentState(key: string): string {
        return this.ticketsService.currentState(key).label;
    }

    nextTicketState(key: string): string {
        const currentIndex = this.states.findIndex(
            (state) => state.key === key
        );
        if (currentIndex !== 3) {
            this.nextState = this.states[currentIndex + 1];
        }
        return this.nextState.label;
    }

    updateStatus(ticket: Ticket, nextState: string): void {
        this.loading = true;
        ticket.ticketState = nextState;
        this.ticketsService
            .updateTicket(ticket, nextState)
            .then((res) => {
                this.loading = false;
                this.ticketsService.ticket = ticket;
                this.izitoastAlertService.CustomSuccessAlert('El estado del ticket ha sido actualizado')
            })
            .catch((err) => {
                this.loading = false;
                this.izitoastAlertService.CustomErrorAlert('Ha ocurrido un error intentando actualizar el estado del ticket');
            });
    }

    closeDrawer(): void {
        this.location.back();
        this.ticketsComponent.matDrawer.close();
    }
}
