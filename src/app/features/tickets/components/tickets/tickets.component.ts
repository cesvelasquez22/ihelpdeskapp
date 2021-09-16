import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {FormControl} from '@angular/forms';
import {MatDrawer} from '@angular/material/sidenav';
import {ActivatedRoute, Router} from '@angular/router';
import {FuseMediaWatcherService} from '@fuse/services/media-watcher';
import {TitleHeader} from 'app/core/models/title-header.model';
import {combineLatest, ReplaySubject, Subject} from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    takeUntil,
    tap
} from 'rxjs/operators';
import {Ticket} from '../../models/ticket.interface';
import {TicketsService} from '../../services/tickets.service';
import {User} from 'app/features/users/models/user.interface';

@Component({
    selector: 'app-tickets',
    templateUrl: './tickets.component.html',
    styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit, OnDestroy {
    titleHeader: TitleHeader = {
        module: 'Tickets',
        overview: 'Listado',
        title: 'Tickets',
    };
    loading = false;

    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    private tickets: Ticket[] = [];
    adminUsers: User[] = [];
    ticketsCount = 0;
    searching = false;

    // DRAWER
    drawerMode: 'side' | 'over';

    // RELATED TO FILTER
    filteredInfo$ = new ReplaySubject<Ticket[]>(1);
    filterControl = new FormControl();
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
    ) {
    }

    ngOnInit(): void {
        this.getTicketsInfo();
        this.filterControl.valueChanges
            .pipe(
                takeUntil(this.unsubscribe$),
                map((query: string) => (query ? query.trim() : '')),
                debounceTime(150),
                distinctUntilChanged(),
            )
            .subscribe((search) => (this.applyFilter(search)));

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
            .subscribe(({matchingAliases}) => {
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

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getTicketsInfo(): void {
        this.loading = true;
        const ticketsInfo$ = combineLatest(
            this.ticketsService.getAllTickets(),
            this.ticketsService.getAdminUsers(),
        );

        ticketsInfo$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((data) => {
                if (data[0] && data[0].length > 0) {
                    this.filteredInfo$.next(data[0]);
                    this.tickets = data[0];
                    this.ticketsCount = data[0].length;
                }

                if (data[1] && data[1].length > 0) {
                    this.adminUsers = data[1];
                }
                this.loading = false;
            }, (err) => (this.loading = false));
    }

    /**
     * On backdrop clicked
     */
    onBackdropClicked(): void {
        this.location.back();
        this._changeDetectorRef.markForCheck();
        this.matDrawer.close();
    }

    openPreview(ticket: Ticket): void {
        // Get the current activated route
        this.ticketsService.ticket = ticket;
        this.selectedTicket = ticket;
        if (!this.matDrawer.opened) {
            let route = this.route;
            while (route.firstChild) {
                route = route.firstChild;
            }
            this.router.navigate(['preview'], {relativeTo: route});
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    private applyFilter(search: string): void {
        if (!search) {
            this.filteredInfo$.next(this.tickets);
        } else {
            search = search.toLowerCase();
        }

        this.filteredInfo$.next(
            this.tickets.filter((ticket) => ticket.subject.toLowerCase().indexOf(search) > -1 || ticket.uid.toLowerCase().indexOf(search) > -1)
        );

        this.filteredInfo$.pipe(takeUntil(this.unsubscribe$), tap((tickets) => this.ticketsCount = tickets.length)).subscribe();
    }

    assignTicketTo(user: User): void {
        console.log(user);
    }

    currentState(key: string): string {
        return this.ticketsService.currentState(key).label;
    }
}
