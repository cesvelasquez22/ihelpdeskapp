import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Role } from '../../models/role.interface';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, OnDestroy {
  roles: Role[] = [];

  private unsubscribe$ = new Subject<void>();
  constructor(
    private rolesService: RolesService
  ) { }

  ngOnInit(): void {
    this.getRoles();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getRoles() {
    this.rolesService.getAllRoles().pipe(takeUntil(this.unsubscribe$)).subscribe(roles => {
      if (roles && roles.length > 0) {
        this.roles = roles;
      }
    })
  }
}
