import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'app/core/auth/firebase.auth';
import { IUser } from 'app/core/user/user.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    user$: Observable<IUser>;
    constructor(private firebaseAuthService: FirebaseAuthService) {}

    ngOnInit(): void {
        // Get current user
        this.user$ = this.firebaseAuthService.user$;
    }
}
