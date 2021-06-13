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

@NgModule({
  declarations: [
    TicketsComponent,
    TicketDetailComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    SharedModule,

    // Material
    MatIconModule,
    MatButtonModule,
  ],
  providers: [TicketsService],
})
export class TicketsModule { }
