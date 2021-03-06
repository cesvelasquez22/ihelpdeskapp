import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { FirebaseAuthService } from 'app/core/auth/firebase.auth';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: FuseAnimations,
})
export class SignInComponent implements OnInit {
  // RELATED TO FORM
  signInForm: FormGroup;
  @ViewChild('signInNgForm') signInNgForm: NgForm;

  // ALERTS
  alert: { type: FuseAlertType, message: string } = {
    type: 'success',
    message: ''
  };
  showAlert: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseAuthService: FirebaseAuthService,
    private router: Router,
    private route: ActivatedRoute,

  ) {
    this.buildForm();
  }

  private buildForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: ['']
    })
  }
  ngOnInit(): void {
  }

  signIn(): void {
    // Return if the form is invalid
    if (this.signInForm.invalid) {
      return;
    }

    // Disable the form
    this.signInForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Sign in
    this.firebaseAuthService.signIn(this.signInForm.value)
      .then(
        () => {

          // Set the redirect url.
          // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
          // to the correct page after a successful sign in. This way, that url can be set via
          // routing file and we don't have to touch here.
          const redirectURL = this.route.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

          // Navigate to the redirect url
          this.router.navigateByUrl(redirectURL);

        }
      ).catch((err) => {
        // Re-enable the form
        this.signInForm.enable();

        // Reset the form
        this.signInNgForm.resetForm();

        // Set the alert
        this.alert = {
          type: 'error',
          message: 'Correo y/o contrase??a incorrecta'
        };

        // Show the alert
        this.showAlert = true;
      });
  }

}
