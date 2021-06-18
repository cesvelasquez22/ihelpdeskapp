import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets.routing';
import { TicketsComponent } from './components/tickets/tickets.component';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { TicketsService } from './services/tickets.service';
import { SharedModule } from 'app/shared/shared.module';


// Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TicketPreviewComponent } from './components/ticket-preview/ticket-preview.component';

@NgModule({
  declarations: [
    TicketsComponent,
    TicketDetailComponent,
    TicketPreviewComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    SharedModule,

    // Material
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
  ],
  providers: [TicketsService],
})
export class TicketsModule { }
