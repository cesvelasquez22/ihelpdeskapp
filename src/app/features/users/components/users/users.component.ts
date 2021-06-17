import { Component, OnInit } from '@angular/core';
import { TitleHeader } from 'app/core/models/title-header.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../models/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    loading = false;
    // Header
    titleHeader: TitleHeader = {
        module: 'Seguridad',
        overview: 'Listado',
        title: 'Usuarios',
    };
    users: User[] = [];

    private unsubscribe$ = new Subject<void>();
    constructor(private userService: UsersService) {}

    ngOnInit(): void {
        this.getUsers();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getUsers() {
        this.loading = true;
        this.userService
            .getAllUsers()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (users) => {
                    if (users && users.length > 0) {
                        this.users = users;
                    }
                    this.loading = false;
                },
                (err) => (this.loading = false)
            );
    }

    changeUserStatus(user: User) {
        user.active = !user.active;
        this.userService.updateUser(user);
    }
}
