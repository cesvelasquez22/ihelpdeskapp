import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IzitoastAlertService } from 'app/core/alerts/izitoast-alert.service';
import { TitleHeader } from 'app/core/models/title-header.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from '../../models/category.interface';
import { CategoriesService } from '../../services/categories.service';
import { CategoryDetailComponent } from '../category-detail/category-detail.component';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
    // Header
    titleHeader: TitleHeader = {
        module: 'Mantenimientos',
        overview: 'Detalle de la Categoría',
        title: 'Categorías',
    };

    // PARAMS
    loading = false;

    categories: Category[] = [];

    private unsubscribe$ = new Subject<void>();
    constructor(
        private categoriesService: CategoriesService,
        private dialog: MatDialog,
        private izitoastAlertService: IzitoastAlertService
    ) {}

    ngOnInit(): void {
        this.getCategories();
        this.listenChangesCategories();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getCategories() {
        this.loading = true;
        this.categoriesService
            .getAllCategories()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (categories) => {
                    if (categories && categories.length > 0) {
                        this.categories = categories;
                    }
                    this.loading = false;
                },
                (err) => (this.loading = false)
            );
    }

    listenChangesCategories() {
        this.categoriesService.category$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((category) => {
                if (category && category !== null) {
                    if (category.edit) {
                        console.log(category);
                        this.updateCategory(category);
                    } else {
                        this.addCategory(category);
                    }
                }
            });
    }

    openDialog(element?, editar?) {
        this.dialog.open(CategoryDetailComponent, {
            data: {
                editCategory: editar ? element : null,
            },
            width: 'auto',
            disableClose: false,
        });
    }

    addCategory(category: Category) {
        this.loading = true;
        this.categoriesService
            .createCategory(category)
            .then(() => {
                this.loading = false;
                this.izitoastAlertService.CustomSuccessAlert(
                    'Se ha creado la categoría!'
                );
            })
            .catch((err) => {
                this.loading = false;
                this.izitoastAlertService.CustomErrorAlert(
                    'Hubo un error al crear la categoría'
                );
            });
    }

    updateCategory(category: Category) {
        this.loading = true;
        category.active = !category.active;
        this.categoriesService
            .updateCategory(category)
            .then(() => {
                this.loading = false;
                this.izitoastAlertService.CustomSuccessAlert(
                    'Se ha actualizado la categoría!'
                );
            })
            .catch((err) => {
                this.loading = false;
                this.izitoastAlertService.CustomErrorAlert(
                    'Hubo un error al actualizando la categoría'
                );
            });
    }

    async deleteCategory(uid: string) {
        this.loading = true;
        await this.categoriesService.deleteCategory(uid);
        this.loading = false;
    }
}
