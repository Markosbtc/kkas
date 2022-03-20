import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from 'src/app/shared/constants/constants';
import { SportsTeam } from 'src/app/shared/models/sportsTeam';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  isSubmitted = false;
  user: User;
  teams: SportsTeam[] = [];


  constructor(
    public authService: AuthService,
    public teamService: TeamService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getTeams();
  }

  async register(email: string, password: string) {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.emailSignUp(email, password, this.user)
      .then(async (res) => {
        await loading.dismiss();
        this.initForm();
        this.isSubmitted = false;
        this.router.navigate(['login'], { replaceUrl: true });
      }).catch(async (error) => {
        await loading.dismiss();
        // console.error(error);
        let msg = this.translate.instant('auth.try_again');
        if (error.code == 'auth/email-already-in-use') {
          msg = this.translate.instant('auth.email_used');
        }
        const alert = await this.alertController.create({
          header: this.translate.instant('auth.err_register'),
          message: msg,
          buttons: ['OK']
        });
        await alert.present();
      });
  }

  initForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(Constants.EMAIL_PATTERN)]],
      password: ['', [Validators.required, Validators.pattern(Constants.PASSWORD_PATTERN)]],
      repeatPassword: ['', [Validators.required]],
      role: ['user', [Validators.required]],
      team: ['0', [Validators.required]]
    }, { validators: [ValidatePassword.comparePasswords] });
  }

  roleChanged(event: any) {
    if (event.detail.value === 'user') {
      this.registerForm.addControl("team", this.formBuilder.control('0', [Validators.required]));
    } else if (event.detail.value === 'referee') {
      this.registerForm.removeControl("team");
    }
  }

  getTeams() {
    this.teamService.getSportTeams().subscribe((res) => {
      this.teams = res;
    }, (err) => {
      console.error(err);
    });
  }

  submitForm(): void {
    this.isSubmitted = true;
    if (this.registerForm.valid) {
      this.user = {
        name: {
          familyName: this.registerForm.get('lastName').value,
          givenName: this.registerForm.get('firstName').value,
          fullName: this.registerForm.get('firstName').value + ' ' + this.registerForm.get('lastName').value,
        },
        role: this.registerForm.get('role').value,
        team: this.registerForm.get('team').value
      }
      this.register(
        this.registerForm.get('email').value,
        this.registerForm.get('password').value,
      );
    }
  }

}

class ValidatePassword {
  static comparePasswords(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password').value;
    const passwordConfirmation = group.get('repeatPassword').value;

    if (password === passwordConfirmation) {
      return null
    } else {
      group.get('repeatPassword').setErrors({ noMatch: true });
      return { noMatch: true };
    }
  }
}
