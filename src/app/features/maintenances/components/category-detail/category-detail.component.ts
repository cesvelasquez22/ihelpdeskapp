import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TitleHeader } from 'app/core/models/title-header.model';
import { Category } from '../../models/category.interface';
import { CategoriesService } from '../../services/categories.service';
@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {

  titleHeader: TitleHeader = {
    module: 'Mantenimiento',
    overview : 'Detalle de categoria',
    title: 'categorias',
    back: true,
  };

  // PARAMS
  title: string;

  // RELATED TO FORM
  form: FormGroup;

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CategoryDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = this.formBuilder.group({
      uid: [''],
      name: ['', [Validators.required]],
      createdAt: [new Date()],
      active: [true],
      edit: [(this.data && this.data.editCategory) ? true : false],
    })
   }

  ngOnInit(): void {
    this.title = 'Agregar';

    if (this.data && this.data.editCategory !== null) {
      this.title = 'Editar';
      this.setCategorieInformation(this.data.editCategory);
    }
  }

  clear() {
    this.form.reset();
    this.form.controls.uid.setValue('');
    this.form.controls.name.setValue('');
  }

  setCategorieInformation(categorie: Category) {
    this.form.controls.uid.setValue(categorie.uid);
    this.form.controls.name.setValue(categorie.name);
    this.form.controls.active.setValue(categorie.active);
  }

  save() {
    this.categoriesService.category = this.form.value;
    this.dialogRef.close(this.form.value);
    this.categoriesService.category = null;
    this.clear();
  }

}
