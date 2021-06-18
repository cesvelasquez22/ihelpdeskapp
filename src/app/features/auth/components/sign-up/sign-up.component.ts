import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { FirebaseAuthService } from 'app/core/auth/firebase.auth';
import { IUser, IUserRole, Roles } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { Department } from 'app/features/maintenances/models/department.interface';
import { DepartmentsService } from 'app/features/maintenances/services/departments.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;
    departments: Department[] = [];
    defaultRole: IUserRole;

    // UNSUBSCRIBE ALL
    private unsubscribe$ = new Subject<void>();

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private firebaseAuthService: FirebaseAuthService,
        private departmentsService: DepartmentsService,
        private userService: UserService
    ) {
        this.buildForm();
    }

    private buildForm() {
        this.signUpForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            department: ['', [Validators.required]],
            displayName: ['', [Validators.required]],
            password: ['', Validators.required],
            role: [''],
            active: [true],
        });
    }

    ngOnInit(): void {
        this.departmentsService
            .getAllDepartments()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((departments) => {
                if (departments && departments.length > 0) {
                    this.departments = departments;
                }
            });
        this.getDefaultRole();
    }

    signUp() {
        // Return if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        const newUserData = this.signUpForm.value;
        const deptSelected = this.departments.find(
            (dept) => dept.uid === newUserData.department
        );
        const { uid, name } = deptSelected;
        newUserData.department = { uid, name };
        newUserData.role = this.defaultRole;

        // Sign in
        this.firebaseAuthService.signUp(newUserData).subscribe(
            (user) => {
                // Navigate to the confirmation required page
                this.router.navigateByUrl('/confirmation-required');
            },
            (err) => {
                // Re-enable the form
                this.signUpForm.enable();

                // Reset the form
                this.signUpNgForm.resetForm();

                // Set the alert
                this.alert = {
                    type: 'error',
                    message: 'Algo salió mal, por favor intente de nuevo.',
                };

                // Show the alert
                this.showAlert = true;
            }
        );
    }

    getDefaultRole() {
        this.userService
            .getDefaultRole()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((defaultRole) => {
                if (defaultRole && defaultRole.length > 0) {
                    const { uid, name } = defaultRole[0];
                    this.defaultRole = { uid, name };
                }
            });
    }
}
