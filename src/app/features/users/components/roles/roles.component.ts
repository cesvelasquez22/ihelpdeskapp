import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TitleHeader } from 'app/core/models/title-header.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Role } from '../../models/role.interface';
import { RolesService } from '../../services/roles.service';
import { RoleDetailComponent } from '../role-detail/role-detail.component';

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit, OnDestroy {
    // Header
    titleHeader: TitleHeader = {
        module: 'Seguridad',
        overview: 'Listado',
        title: 'Roles',
    };

    // PARAMS
    loading = false;

    roles: Role[] = [];

    private unsubscribe$ = new Subject<void>();
    constructor(
        private rolesService: RolesService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.getRoles();
        this.listenChangesRoles();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getRoles() {
        this.rolesService
            .getAllRoles()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((roles) => {
                if (roles && roles.length > 0) {
                    this.roles = roles;
                }
            });
    }

    listenChangesRoles() {
        this.rolesService.role$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((role) => {
                if (role && role !== null) {
                    if (role.edit) {
                        this.updateRole(role);
                    } else {
                        this.addRole(role);
                    }
                }
            });
    }

    openDialog(element?, editar?) {
        this.dialog.open(RoleDetailComponent, {
            data: {
                editRole: editar ? element : null,
            },
            width: 'auto',
            disableClose: false,
        });
    }

    addRole(role: Role) {
        this.loading = true;
        this.rolesService
            .createRole(role)
            .then(() => {
                console.info('Role created!');
                this.loading = false;
            })
            .catch((err) => {
                console.error('There was an error trying create the role', err);
                this.loading = false;
            });
    }

    updateRole(role: Role) {
        this.loading = true;
        role.active = !role.active;
        this.rolesService
            .updateRole(role)
            .then(() => {
                console.info('Role updated!');
                this.loading = false;
            })
            .catch((err) => {
                console.error('There was an error trying update the role', err);
                this.loading = false;
            });
    }

    async deleteRole(uid: string) {
        this.loading = true;
        await this.rolesService.deleteRole(uid);
        this.loading = false;
    }
}
