import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TitleHeader } from 'app/core/models/title-header.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Categorie } from '../../models/categorie.interface';
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
        module: 'mantenimiento',
        overview: 'Detalle de mantenimiento',
        title: 'Categorias',
    };

    // PARAMS
    loading = false;

    categories: Categorie[] = [];

    private unsubscribe$ = new Subject<void>();
    constructor(
        private categoriesService: CategoriesService,
        private dialog: MatDialog
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
        this.categoriesService
            .getAllCategories()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((categories) => {
                if (categories && categories.length > 0) {
                    this.categories = categories;
                }
            });
    }

    listenChangesCategories() {
        this.categoriesService.categorie$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((categorie) => {
                if (categorie && categorie !== null) {
                    if (categorie.edit) {
                        console.log(categorie);
                        this.updateCategorie(categorie);
                    } else {
                        this.addCategorie(categorie);
                    }
                }
            });
    }

    openDialog(element?, editar?) {
        this.dialog.open(CategoryDetailComponent, {
            data: {
                editCategorie: editar ? element : null,
            },
            width: 'auto',
            disableClose: false,
        });
    }

    addCategorie(categorie: Categorie) {
        this.loading = true;
        this.categoriesService
            .createCategorie(categorie)
            .then(() => {
                console.info('Categorie created!');
                this.loading = false;
            })
            .catch((err) => {
                console.error('There was an error trying create the categorie', err);
                this.loading = false;
            });
    }

    updateCategorie(categorie: Categorie) {
        this.loading = true;
        categorie.active = !categorie.active;
        this.categoriesService
            .updateCategorie(categorie)
            .then(() => {
                console.info('Categorie updated!');
                this.loading = false;
            })
            .catch((err) => {
                console.error('There was an error trying update the categorie', err);
                this.loading = false;
            });
    }

    async deleteCategorie(uid: string) {
        this.loading = true;
        await this.categoriesService.deleteCategorie(uid);
        this.loading = false;
    }
}
