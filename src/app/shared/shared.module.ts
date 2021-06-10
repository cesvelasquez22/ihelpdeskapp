import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitleHeaderComponent } from './ui/title-header/title-header.component';

// Material
import { MatIconModule } from '@angular/material/icon';
import { StarsComponent } from './ui/stars/stars.component';
import { RouterModule } from '@angular/router';
import { LoadingOverlayComponent } from './ui/loading-overlay/loading-overlay.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, MatIconModule],
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        TitleHeaderComponent,
        StarsComponent,
        LoadingOverlayComponent,
    ],
    declarations: [TitleHeaderComponent, StarsComponent, LoadingOverlayComponent],
})
export class SharedModule {}
