import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'app/core/auth/firebase.auth';
import { IUser } from 'app/core/user/user.model';
import { Observable } from 'rxjs';
import { DepartmentStats } from './department.stats';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    user$: Observable<IUser>;

    deptStats: DepartmentStats[] = [
        {
            departmentName: 'Ventas',
            openTickets: 21,
            completedTickets: 10,
            color: 'text-blue-600'
        },
        {
            departmentName: 'RRHH',
            openTickets: 20,
            completedTickets: 10,
            color: 'text-red-600'
        },
        {
            departmentName: 'Compras',
            openTickets: 50,
            completedTickets: 25,
            color: 'text-amber-500'
        },
        {
            departmentName: 'Administración',
            openTickets: 10,
            completedTickets: 6,
            color: 'text-green-600'
        },
    ]
    constructor(private firebaseAuthService: FirebaseAuthService) {}

    ngOnInit(): void {
        // Get current user
        this.user$ = this.firebaseAuthService.user$;
    }
}
