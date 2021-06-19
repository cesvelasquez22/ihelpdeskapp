import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IzitoastAlertService } from 'app/core/alerts/izitoast-alert.service';
import { FirebaseAuthService } from 'app/core/auth/firebase.auth';
import { TitleHeader } from 'app/core/models/title-header.model';
import { IUser } from 'app/core/user/user.model';
import { Customer } from 'app/features/customers/models/customer.model';
import { CustomersService } from 'app/features/customers/services/customers.service';
import { Categorie } from 'app/features/maintenances/models/categorie.interface';
import { Department } from 'app/features/maintenances/models/department.interface';
import { CategoriesService } from 'app/features/maintenances/services/categories.service';
import { DepartmentsService } from 'app/features/maintenances/services/departments.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { TicketPriority, TicketState } from '../../models/ticket.interface';
import { TicketsService } from '../../services/tickets.service';

@Component({
    selector: 'app-ticket-detail',
    templateUrl: './ticket-detail.component.html',
    styleUrls: ['./ticket-detail.component.scss'],
})
export class TicketDetailComponent implements OnInit {
    titleHeader: TitleHeader = {
        module: 'Tickets',
        overview: 'Detalle del ticket',
        title: 'Tickets',
        backRoute: '/tickets/my',
        back: true,
    };
    loading = false;

    // RELATED TO FORM
    form: FormGroup;
    departments: Department[] = [];
    categories: Categorie[] = [];
    priorities: TicketPriority[] = [];
    currentUser: IUser;
    currentCustomer: Customer;

    // UNSUBSCRIBE ALL
    private unsubscribe$ = new Subject<void>();

    constructor(
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private departmentsService: DepartmentsService,
        private ticketsService: TicketsService,
        private customersService: CustomersService,
        private firebaseAuthService: FirebaseAuthService,
        private izitoastAlertService: IzitoastAlertService,
        private router: Router
    ) {
        this.buildForm();
    }

    private buildForm() {
        this.form = this.formBuilder.group({
            uid: [''],
            subject: ['', [Validators.required]],
            description: ['', [Validators.required]],
            category: ['', [Validators.required]],
            priority: ['', [Validators.required]],
            department: ['', [Validators.required]],
            customer: [''],
            createdAt: [new Date()],
            attendedBy: [''],
            ticketState: [TicketState.new],
        });
    }

    ngOnInit(): void {
        this.getTicketInfo();
    }

    getTicketInfo() {
        const ticketInfo$: Observable<
            [Categorie[], Department[], TicketPriority[], Customer]
        > = combineLatest(
            this.categoriesService.getAllCategories(),
            this.departmentsService.getAllDepartments(),
            this.ticketsService.getAllPriorities(),
            this.firebaseAuthService.user$.pipe(
                switchMap((user) => {
                    this.currentUser = user;
                    return this.customersService.getCustomerByUid(user.uid);
                })
            )
        );

        ticketInfo$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
            if (data[0] && data[0].length > 0) this.categories = data[0];
            if (data[1] && data[1].length > 0) this.departments = data[1];
            if (data[2] && data[2].length > 0) this.priorities = data[2];
            if (data[3] && data[3] !== null) this.currentCustomer = data[3];
        });
    }

    onSubmit() {
        this.loading = true;
        const ticketData = this.form.value;
        const { category, department } = ticketData;
        ticketData.category = this.mappingData(category);
        ticketData.department = this.mappingData(department);
        ticketData.attendedBy = {
            uid: this.currentUser.uid,
            displayName: this.currentUser.displayName,
            email: this.currentUser.email,
        };
        ticketData.customer = {
            uid: this.currentCustomer.uid,
            displayName: this.currentCustomer.displayName,
            email: this.currentCustomer.email,
            department: this.currentCustomer.department.name,
        };
        this.ticketsService
            .createTicket(ticketData)
            .then((res) => {
                this.izitoastAlertService.CustomSuccessAlert(
                    'El ticket se ha creado exitosamente'
                );
                this.router.navigate(['/tickets/my']);
                this.loading = false;
            })
            .catch((err) => {
                this.loading = false;
                this.izitoastAlertService.CustomErrorAlert(
                    'Hubo un error intentanto crear el ticket'
                );
            });
        this.loading = false;
    }

    mappingData(data: any) {
        const { uid, name } = data;
        return { uid, name };
    }
}
