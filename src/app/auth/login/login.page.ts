import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from 'src/app/shared/constants/constants';
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
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  async logIn(email: string, password: string) {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.emailLogin(email, password)
      .then(async (res) => {
        // console.log(res);

        await loading.dismiss();
        this.router.navigate(['home'], { replaceUrl: true });
        /* if (this.authService.isEmailVerified) {
          this.router.navigate(['home']);
        } else {
          window.alert('Email is not verified')
          return false;
        } */

      }).catch(async (error) => {
        await loading.dismiss();
        // console.error(error);
        let msg = this.translate.instant('auth.try_again');
        if (error.code == 'auth/user-not-found') {
          msg = this.translate.instant('auth.user_not_found');
        } else if (error.code == 'auth/wrong-password') {
          msg = this.translate.instant('auth.wrong_password');
        }
        const alert = await this.alertController.create({
          header: this.translate.instant('auth.err_login'),
          message: msg,
          buttons: ['OK']
        });
        await alert.present();
      })
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(Constants.EMAIL_PATTERN)]],
      password: ['', [Validators.required, Validators.pattern(Constants.PASSWORD_PATTERN)]]
    });
  }

  submitForm(): void {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.logIn(this.loginForm.get('email').value, this.loginForm.get('password').value);
    }
  }

}
