import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'app/core/auth/firebase.auth';
import { IUser } from 'app/core/user/user.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DepartmentStats } from './department.stats';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    currentUser: IUser;

    deptStats: DepartmentStats[] = [
        {
            departmentName: 'Ventas',
            openTickets: 21,
            completedTickets: 10,
            color: 'text-blue-600',
        },
        {
            departmentName: 'RRHH',
            openTickets: 20,
            completedTickets: 10,
            color: 'text-red-600',
        },
        {
            departmentName: 'Compras',
            openTickets: 50,
            completedTickets: 25,
            color: 'text-amber-500',
        },
        {
            departmentName: 'Administración',
            openTickets: 10,
            completedTickets: 6,
            color: 'text-green-600',
        },
    ];

    private unsubscribe$ = new Subject<void>();
    constructor(private firebaseAuthService: FirebaseAuthService) {}

    ngOnInit(): void {
        // Get current user
        this.firebaseAuthService.getCurrentUser().then(user => {
            if (user && user !== null) {
                this.currentUser = user;
            }
        })
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
