import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from 'src/app/shared/constants/constants';
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
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  async register(firstName: string, lastName: string, email: string, password: string, password2: string) {
    if (password === password2) {
      const loading = await this.loadingController.create();
      await loading.present();

      this.authService.emailSignUp(email, password)
        .then(async (res) => {
          // Do something here
          // this.router.navigate(['verify-email']);
          // TODO: create user in firebase
          await loading.dismiss();
          this.router.navigate(['login'], { replaceUrl: true });
        }).catch(async (error) => {
          await loading.dismiss();
          console.error(error.message);
          const alert = await this.alertController.create({
            header: this.translate.instant('auth.err_register'),
            message: this.translate.instant('auth.try_again'),
            buttons: ['OK']
          });
          await alert.present();
        });
    }
  }

  initForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(Constants.EMAIL_PATTERN)]],
      password: ['', [Validators.required, Validators.pattern(Constants.PASSWORD_PATTERN)]],
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
