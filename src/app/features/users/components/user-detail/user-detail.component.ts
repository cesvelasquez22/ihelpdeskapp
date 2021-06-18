import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IzitoastAlertService } from 'app/core/alerts/izitoast-alert.service';
import { TitleHeader } from 'app/core/models/title-header.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Role } from '../../models/role.interface';
import { User } from '../../models/user.interface';
import { RolesService } from '../../services/roles.service';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
    loading = false;
    //Header
    titleHeader: TitleHeader = {
        module: 'Seguridad',
        overview: 'Detalle de usuarios',
        title: 'Usuarios',
        back: true,
    };

    // RELATED TO FORM
    userForm: FormGroup;
    roles: Role[] = [];
    user: User[] = [];
    userUidPath: string | null;

    // UNSUBSCRIBE ALL
    private unsubscribe$ = new Subject<void>();

    constructor(
        private fb: FormBuilder,
        private rolesService: RolesService,
        private usersService: UsersService,
        private router: Router,
        private route: ActivatedRoute,
        private izitoastAlertService: IzitoastAlertService,
    ) {
        this.buildForm();
        this.userUidPath = this.route.snapshot.paramMap.get('id');
    }

    private buildForm() {
        this.userForm = this.fb.group({
            uid: [''],
            displayName: ['', Validators.required],
            email: ['', Validators.required],
            role: ['', Validators.required],
            active: [true],
        });
    }

    ngOnInit() {
        this.getRoles();
        this.getUserInfo();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getUserInfo() {
        this.loading = true;
        if (this.userUidPath !== null) {
            this.usersService.getUserByUid(this.userUidPath).subscribe(
                (user) => {
                    this.setInfo(user);
                    this.loading = false;
                },
                (err) => (this.loading = false)
            );
        }
    }

    getRoles() {
        this.loading = true;
        this.rolesService
            .getAllRoles()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (roles) => {
                    this.roles = roles;
                    this.loading = false;
                },
                (err) => (this.loading = false)
            );
    }

    setInfo(user: User) {
        this.userForm.get('uid')?.setValue(user.uid);
        this.userForm.get('role')?.setValue(user.role.uid);
        this.userForm.get('displayName')?.setValue(user.displayName);
        this.userForm.get('email')?.setValue(user.email);
        this.userForm.get('active')?.setValue(user.active);
    }

    save() {
        this.loading = true;
        const userData = this.userForm.value;
        const role = this.roles.find((role) => role.uid === userData.role);
        const { uid, name } = role;
        userData.role = { uid, name };
        this.usersService.updateUser(userData).subscribe(
            (user) => {
                this.izitoastAlertService.CustomSuccessAlert(
                    'El usuario se ha actualizado exitosamente'
                );
                this.router.navigate(['/security/users']);
                this.loading = false;
            },
            (err) => {
                this.loading = false;
                this.izitoastAlertService.CustomErrorAlert(
                    'Hubo un error intentanto actualizar el usuario'
                );
            }
        );
    }
}
