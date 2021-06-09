import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TitleHeader } from 'app/core/models/title-header.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Role } from '../../models/role.interface';
import { RolesService } from '../../services/roles.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
    //Header
    titleHeader: TitleHeader = {
        module: 'Seguridad',
        overview: 'Detalle de usuarios',
        title: 'Usuarios',
        back: true,
    };

    // RELATED TO FORM
    form: FormGroup;
    roles: Role[] = [];

    // UNSUBSCRIBE ALL
    private unsubscribe$ = new Subject<void>();

    constructor(private fb: FormBuilder, private rolesService: RolesService) {
        this.buildForm();
    }

    private buildForm() {
        this.form = this.fb.group({
            uid: [''],
            displayName: ['', Validators.required],
            email: ['', Validators.required],
            role: ['', Validators.required],
            active: [true],
        });
    }

    ngOnInit(): void {
        this.getRoles();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getRoles() {
        this.rolesService
            .getAllRoles()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((roles) => (this.roles = roles));
    }

    save() {}
}
