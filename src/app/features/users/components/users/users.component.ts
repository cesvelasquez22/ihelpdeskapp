import { Component, OnInit } from '@angular/core';
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
<<<<<<< Updated upstream
=======
    // Header
    titleHeader: TitleHeader = {
        module: 'Seguridad',
        overview: 'Listado',
        title: 'Usuarios',
    };

>>>>>>> Stashed changes
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
        this.userService
            .getAllUsers()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((users) => {
                if (users && users.length > 0) {
                    this.users = users;
                }
            });
    }

    changeUserStatus(user: User) {
        user.active = !user.active;
        this.userService.updateUser(user);
    }
}
