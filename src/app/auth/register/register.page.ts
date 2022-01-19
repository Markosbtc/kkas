import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  isSubmitted = false;


  constructor(
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm()
  }

  register(firstName: string, lastName: string, email: string, password: string, password2: string) {
    if (password === password2) {
      this.authService.emailSignUp(email, password)
        .then((res) => {
          // Do something here
          // this.router.navigate(['verify-email']);
          this.router.navigate(['login']);

        }).catch((error) => {
          window.alert(error.message)
        })
    }
  }

  initForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]]
    }, { validators: [ValidatePassword.comparePasswords] });
  }

  submitForm(): void {
    this.isSubmitted = true;
    if (this.registerForm.valid) {
      this.register(
        this.registerForm.get('firstName').value,
        this.registerForm.get('lastName').value,
        this.registerForm.get('email').value,
        this.registerForm.get('password').value,
        this.registerForm.get('password2').value
      );
    }
  }

}

class ValidatePassword {
  static comparePasswords(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password').value;
    const passwordConfirmation = group.get('password2').value;

    return (password === passwordConfirmation) ? null : { noMatch: true };
  }
}
