import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';

import { CustomersRoutingModule } from './customers.routing';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { CustomersService } from './services/customers.service';

@NgModule({
    declarations: [CustomersComponent, CustomerDetailComponent],
    imports: [CommonModule, CustomersRoutingModule, SharedModule],
    providers: [CustomersService],
})
export class CustomersModule {}
