import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { TitleHeader } from 'app/core/models/title-header.model';
import { of, Subject } from 'rxjs';
import {
    catchError,
    debounceTime,
    distinctUntilChanged,
    map,
    takeUntil,
    tap,
} from 'rxjs/operators';
import { Ticket } from '../../models/ticket.interface';
import { TicketsService } from '../../services/tickets.service';

@Component({
    selector: 'app-tickets',
    templateUrl: './tickets.component.html',
    styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
    titleHeader: TitleHeader = {
        module: 'Tickets',
        overview: 'Listado',
        title: 'Tickets',
    };

    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
    tickets: Ticket[] = [];
    ticketsCount = 0;
    searching = false;

    // DRAWER
    drawerMode: 'side' | 'over';

    searchInputControl: FormControl = new FormControl();
    selectedTicket: Ticket;

    // UNSUBSCRIBE ALL
    private unsubscribe$ = new Subject<void>();

    constructor(
        private ticketsService: TicketsService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService
    ) {}

    ngOnInit(): void {
        this.getTickets();

        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this.unsubscribe$),
                map((query: string) => (query ? query.trim() : '')),
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => (this.searching = true)),
                // switchMap((query : string) => {
                //     return this.customersService.searchCustomers(query).pipe(
                //       tap(customers => {
                //         this.customersCount = customers.length;
                //       })
                //     );
                // }),
                tap(() => (this.searching = false)),
                catchError(() => {
                    this.searching = false;
                    this.ticketsCount = 0;
                    return of([]);
                })
            )
            .subscribe((changes) => console.log(changes));

        // Subscribe to MatDrawer opened change
        this.matDrawer.openedChange.subscribe((opened) => {
            if (!opened) {
                // Remove the selected contact when drawer closed
                this.selectedTicket = null;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(({ matchingAliases }) => {
                // Set the drawerMode if the given breakpoint is active
                if (matchingAliases.includes('lg')) {
                    this.drawerMode = 'side';
                } else {
                    this.drawerMode = 'over';
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    getTickets() {
        this.ticketsService
            .getAllTickets()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((tickets) => {
                this.ticketsCount = tickets.length;
                if (tickets && tickets.length > 0) this.tickets = tickets;
            });
    }

    /**
     * On backdrop clicked
     */
    onBackdropClicked(): void {
        this.location.back();
        this._changeDetectorRef.markForCheck();
        this.matDrawer.close();
    }

    openPreview(ticket: Ticket) {
        // Get the current activated route
        this.ticketsService.ticket = ticket;
        this.selectedTicket = ticket;
        if (!this.matDrawer.opened) {
            let route = this.route;
            while (route.firstChild) {
                route = route.firstChild;
            }
            this.router.navigate(['preview'], { relativeTo: route });
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
}
