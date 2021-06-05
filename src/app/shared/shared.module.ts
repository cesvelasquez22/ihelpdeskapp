import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitleHeaderComponent } from './ui/title-header/title-header.component';

// Material
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TitleHeaderComponent,
    ],
    declarations: [TitleHeaderComponent],
})
export class SharedModule {}
