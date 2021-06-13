import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { FirebaseAuthService } from 'app/core/auth/firebase.auth';
import { Roles } from 'app/core/user/user.model';

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

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private firebaseAuthService: FirebaseAuthService
    ) {
        this.buildForm();
    }

    private buildForm() {
        this.signUpForm = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
            displayName: [null, [Validators.required]],
            password: [null, Validators.required],
            role: [Roles.customer],
            active: [true],
        });
    }

    ngOnInit(): void {}

    signUp() {
        // Return if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this.firebaseAuthService.signUp(this.signUpForm.value).subscribe(
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
}
