import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TitleHeader } from 'app/core/models/title-header.model';
import { Role } from '../../models/role.interface';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit {
  titleHeader: TitleHeader= {
    module: 'Seguridad',
    overview: 'Detalle de roles',
    title: 'Roles',
    back: true,
  };

  // PARAMS
  title: string;

  // RELATED TO FORM
  form: FormGroup;

  constructor(
    private rolesService: RolesService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RoleDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = this.formBuilder.group({
      uid: [''],
      name: ['', [Validators.required]],
      createdAt: [new Date()],
      active: [true],
      edit: [(this.data && this.data.editRole) ? true : false],
    })
   }

  ngOnInit(): void {
    this.title = 'Nuevo';

    if (this.data && this.data.editRole !== null) {
      this.title = 'Editar';
      this.setRoleInformation(this.data.editRole);
    }
  }

  clear() {
    this.form.reset();
    this.form.controls.uid.setValue('');
    this.form.controls.name.setValue('');
  }

  setRoleInformation(role: Role) {
    this.form.controls.uid.setValue(role.uid);
    this.form.controls.name.setValue(role.name);
    this.form.controls.active.setValue(role.active);
  }

  save() {
    this.rolesService.role = this.form.value;
    this.dialogRef.close(this.form.value);
    this.rolesService.role = null;
    this.clear();
  }

}
