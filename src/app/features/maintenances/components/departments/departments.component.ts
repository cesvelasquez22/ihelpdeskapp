import { Component, OnDestroy, OnInit } from '@angular/core';
import { TitleHeader } from 'app/core/models/title-header.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Department } from '../../models/department.interface';
import { DepartmentsService } from '../../services/departments.service';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentDetailComponent } from '../department-detail/department-detail.component';


@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit, OnDestroy {
  // Header
  titleHeader: TitleHeader = {
    module: 'Mantenimientos',
    overview: 'Listado',
    title: 'Departamentos',
  };

  departments: Department[] = [];
  
  private unsubscribe$ = new Subject<void>();

  constructor(
    private departmentsService: DepartmentsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
        this.getDepartments();
        this.listenChangesDepartments();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getDepartments() {
    this.departmentsService
        .getAllDepartments()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((departments) => {
            if (departments && departments.length > 0) {
                this.departments = departments;
            }
        });
}

listenChangesDepartments() {
  this.departmentsService.department$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((department) => {
          if (department && department !== null) {
              if (department.edit) {
                  this.updateDepartment(department);
              } else {
                  this.addDepartment(department);
              }
          }
      });
}

openDialog(element?, editar?) {
  this.dialog.open(DepartmentDetailComponent, {
      data: {
          editDepartment: editar ? element : null,
      },
      width: 'auto',
      disableClose: false,
  });
}

addDepartment(department: Department) {
  //this.loading = true;
  this.departmentsService
      .createDepartmet(department)
      .then(() => {
          console.info('Department created!');
          //this.loading = false;
      })
      .catch((err) => {
          console.error('There was an error trying create the department', err);
          //this.loading = false;
      });
}

updateDepartment(department: Department) {
  //this.loading = true;
  department.active = !department.active;
  this.departmentsService
      .updateDepartment(department)
      .then(() => {
          console.info('Department updated!');
          //this.loading = false;
      })
      .catch((err) => {
          console.error('There was an error trying update the department', err);
          //this.loading = false;
      });
}

async deleteDepartment(uid: string) {
  //this.loading = true;
  await this.departmentsService.deleteDepartment(uid);
  //this.loading = false;
}

}
