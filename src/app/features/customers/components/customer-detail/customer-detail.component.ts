import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IzitoastAlertService } from 'app/core/alerts/izitoast-alert.service';
import { TitleHeader } from 'app/core/models/title-header.model';
import { Department } from 'app/features/maintenances/models/department.interface';
import { DepartmentsService } from 'app/features/maintenances/services/departments.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Customer } from '../../models/customer.model';
import { CustomersService } from '../../services/customers.service';

@Component({
    selector: 'app-customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent implements OnInit {
    loading = false;
    //Header
    titleHeader: TitleHeader = {
        module: 'Clientes',
        overview: 'Detalle de clientes',
        title: 'Clientes',
        back: true,
    };

    //RELATED TO FORM
    customerForm: FormGroup;
    departments: Department[] = [];
    customer: Customer[] = [];
    customerUidPath: string | null;

    //UNSUBSCRIBE ALL
    private unsubscribe$ = new Subject<void>();

    constructor(
        private fb: FormBuilder,
        private departmentService: DepartmentsService,
        private customerService: CustomersService,
        private router: Router,
        private route: ActivatedRoute,
        private izitoastAlertService: IzitoastAlertService
    ) {
        this.buildForm();
        this.customerUidPath = this.route.snapshot.paramMap.get('id');
    }

    private buildForm() {
        this.customerForm = this.fb.group({
            uid: [''],
            displayName: ['', Validators.required],
            email: ['', Validators.required],
            department: ['', Validators.required],
            active: [true],
        });
    }

    ngOnInit(): void {
        this.getDepartments();
        this.getCustomerInfo();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getCustomerInfo() {
        this.loading = true;
        if (this.customerUidPath !== null) {
            this.customerService
                .getCustomerByUid(this.customerUidPath)
                .subscribe(
                    (customer) => {
                        this.setInfo(customer);
                        this.loading = false;
                    },
                    (err) => (this.loading = false)
                );
        }
    }

    getDepartments() {
        this.loading = true;
        this.departmentService
            .getAllDepartments()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (departments) => {
                    this.departments = departments;
                    this.loading = false;
                },
                (err) => (this.loading = false)
            );
    }

    setInfo(customer: Customer) {
        this.customerForm.get('uid')?.setValue(customer.uid);
        this.customerForm.get('displayName')?.setValue(customer.displayName);
        this.customerForm.get('department')?.setValue(customer.department.uid);
        this.customerForm.get('email')?.setValue(customer.email);
        this.customerForm.get('active')?.setValue(customer.active);
    }

    save() {
        this.loading = true;
        const customerData = this.customerForm.value;
        const department = this.departments.find(
            (department) => department.uid === customerData.department
        );
        const { uid, name } = department;
        customerData.department = { uid, name };
        this.customerService
            .updateCustomer(customerData)
            .then((customer) => {
                this.izitoastAlertService.CustomSuccessAlert(
                    'El usuario se ha actualizado exitosamente'
                );
                this.router.navigate(['/customers']);
                this.loading = false;
            })
            .catch((err) => {
                this.loading = false;
                this.izitoastAlertService.CustomErrorAlert(
                    'Hubo un error intentanto actualizar el usuario'
                );
            });
    }
}
