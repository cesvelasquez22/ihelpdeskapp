import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TitleHeader } from 'app/core/models/title-header.model';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
    //Header
    titleHeader: TitleHeader = {
        module: 'Seguridad',
        overview: 'Detalle de usuarios',
        title: 'Usuarios',
        back: true,
    };

    form: FormGroup;
    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            uid: [''],
            displayName: ['Mario', Validators.required],
        });
    }

    ngOnInit(): void {}

    save() {}
}
