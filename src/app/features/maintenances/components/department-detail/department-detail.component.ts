import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TitleHeader } from 'app/core/models/title-header.model';
import { Department } from '../../models/department.interface';
import { DepartmentsService } from '../../services/departments.service';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss']
})

export class DepartmentDetailComponent implements OnInit {
  titleHeader: TitleHeader = {
    module: 'Mantenimientos',
    overview : 'Detalle del departamento',
    title: 'Departamentos',
    back: true,
  };

  // PARAMS
  title: string;

  // RELATED TO FORM
  form: FormGroup;

  constructor(
    private departmentsService: DepartmentsService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DepartmentDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.form = this.formBuilder.group({
      uid: [''],
      name: ['', [Validators.required]],
      createdAt: [new Date()],
      active: [true],
      edit: [(this.data && this.data.editDepartment) ? true : false],
    })
  }

  ngOnInit(): void {
    this.title = 'Nuevo';

    if (this.data && this.data.editDepartment !== null) {
      this.title = 'Editar';
      this.setDepartmentInformation(this.data.editDepartment);
    }
  }

  clear() {
    this.form.reset();
    this.form.controls.uid.setValue('');
    this.form.controls.name.setValue('');
  }

  setDepartmentInformation(department: Department) {
    this.form.controls.uid.setValue(department.uid);
    this.form.controls.name.setValue(department.name);
    this.form.controls.active.setValue(department.active);
  }

  save() {
    this.departmentsService.department = this.form.value;
    this.dialogRef.close(this.form.value);
    this.departmentsService.department = null;
    this.clear();
  }

}
