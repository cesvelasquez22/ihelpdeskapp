import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsService } from '../../services/tickets.service';
import { TicketsComponent } from '../tickets/tickets.component';
import { Observable } from 'rxjs';
import { Ticket } from '../../models/ticket.interface';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-ticket-preview',
    templateUrl: './ticket-preview.component.html',
    styleUrls: ['./ticket-preview.component.scss'],
})
export class TicketPreviewComponent implements OnInit {
    public ticket$ = new Observable<Ticket>();

    constructor(
        private ticketsComponent: TicketsComponent,
        private router: Router,
        private ticketsService: TicketsService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
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

    closeDrawer() {
        this.location.back();
        this.ticketsComponent.matDrawer.close();
    }
}
