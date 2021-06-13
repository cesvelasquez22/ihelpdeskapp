import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleHeader } from 'app/core/models/title-header.model';
<<<<<<< Updated upstream
=======
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Role } from '../../models/role.interface';
import { User } from '../../models/user.interface';
import { RolesService } from '../../services/roles.service';
import { UsersService } from '../../services/users.service';
>>>>>>> Stashed changes

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
    //Header
    titleHeader: TitleHeader = {
        module: 'Seguridad',
        overview: 'Detalle de usuarios',
        title: 'Usuarios',
    };

<<<<<<< Updated upstream
    form: FormGroup;
    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
=======
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
        private route: ActivatedRoute
    ) {
        this.buildForm();
        this.userUidPath = this.route.snapshot.paramMap.get('id');
    }

    private buildForm() {
        this.userForm = this.fb.group({
>>>>>>> Stashed changes
            uid: [''],
            displayName: ['Mario', Validators.required],
        });
    }

<<<<<<< Updated upstream
    ngOnInit(): void {}
=======
    ngOnInit(): void {
        this.getUserInfo();
        this.getRoles();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getUserInfo() {
        if (this.userUidPath !== null) {
            this.usersService
                .getUserByUid(this.userUidPath)
                .subscribe((user) => {
                    this.setInfo(user);
                });
        }
    }

    getRoles() {
        this.rolesService
            .getAllRoles()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((roles) => (this.roles = roles));
    }
>>>>>>> Stashed changes

    setInfo(user: User) {
        this.userForm.get('uid')?.setValue(user.uid);
        this.userForm.get('role')?.setValue(user.role);
        this.userForm.get('displayName')?.setValue(user.displayName);
        this.userForm.get('email')?.setValue(user.email);
        this.userForm.get('active')?.setValue(user.active);
    }

    save() {
        const userData = this.userForm.value as User;
        this.usersService.updateUser(userData).subscribe(
            (user) => {
                console.log('Usuario actualizado con éxito');
                this.router.navigate(['/security/users']);
            },
            (err) => {
                console.log(err);
            }
        );
    }
}
