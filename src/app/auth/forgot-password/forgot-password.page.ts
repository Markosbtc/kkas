import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from 'src/app/shared/constants/constants';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  emailForm: FormGroup;
  isSubmitted = false;

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private alertController: AlertController,
    private translate: TranslateService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(Constants.EMAIL_PATTERN)]],
    })
  }

  get email() {
    return this.emailForm.get('email');
  }

  async resetPassword() {
    this.isSubmitted = true;
    if (this.emailForm.valid) {
      this.authService.resetPassword(this.email.value).then(() => {
        this.presentToast(this.translate.instant('auth.reset_email_sent'));
      }).catch(async (error) => {
        console.error(error.message);
        const alert = await this.alertController.create({
          header: this.translate.instant('auth.err_reset_email'),
          message: this.translate.instant('auth.try_again'),
          buttons: ['OK']
        });
        await alert.present();
      });

    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
