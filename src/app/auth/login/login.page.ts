import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm()
  }

  logIn(email: string, password: string) {
    this.authService.emailLogin(email, password)
      .then((res) => {
        // console.log(res);

        localStorage.setItem('user', JSON.stringify(res));
        JSON.parse(localStorage.getItem('user'));
        this.router.navigate(['home']);
        /* if (this.authService.isEmailVerified) {
          this.router.navigate(['home']);
        } else {
          window.alert('Email is not verified')
          return false;
        } */
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]]
    });
  }

  submitForm(): void {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.logIn(this.loginForm.get('email').value, this.loginForm.get('password').value);
    }
  }

}
