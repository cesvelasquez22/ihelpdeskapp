import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { TicketPreviewComponent } from './components/ticket-preview/ticket-preview.component';
import { TicketsComponent } from './components/tickets/tickets.component';

const routes: Routes = [
    {
        path: 'my',
        component: TicketsComponent,
        children: [{ path: 'preview', component: TicketPreviewComponent }],
    },
    { path: 'create', component: TicketDetailComponent },
    { path: 'my/:id', component: TicketDetailComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TicketsRoutingModule {}
