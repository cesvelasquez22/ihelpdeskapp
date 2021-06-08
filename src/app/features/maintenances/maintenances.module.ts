import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenancesRoutingModule } from './maintenances.routing';
import { DepartmentsComponent } from './components/departments/departments.component';
import { DepartmentDetailComponent } from './components/department-detail/department-detail.component';
import { DepartmentsService } from './services/departments.service';
import { SharedModule } from 'app/shared/shared.module';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    DepartmentsComponent,
    DepartmentDetailComponent,
  ],
  imports: [
    CommonModule,
    MaintenancesRoutingModule,
    SharedModule,

    // Material
    MatIconModule,
    MatButtonModule,
  ],
  providers: [DepartmentsService],
})
export class MaintenancesModule { }
