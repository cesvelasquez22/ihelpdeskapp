import { Component, OnInit } from '@angular/core';
import { TitleHeader } from 'app/core/models/title-header.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Customer } from '../../models/customer.model';
import { CustomersService } from '../../services/customers.service';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
    loading = false;
    //Header
    titleHeader: TitleHeader = {
        module: 'Clientes',
        overview: 'Listado',
        title: 'Clientes',
    };
    customers: Customer[] = [];

    private unsubscribe$ = new Subject<void>();
    constructor(private customerService: CustomersService) {}

    ngOnInit(): void {
        this.getCustomers();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getCustomers() {
        this.loading = true;
        this.customerService
            .getAllCustomers()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (customers) => {
                    if (customers && customers.length > 0) {
                        this.customers = customers;
                    }
                    this.loading = false;
                },
                (err) => (this.loading = false)
            );
    }

    changeCustomerStatus(customer: Customer) {
        customer.active = !customer.active;
        this.customerService.updateCustomer(customer);
    }
}
