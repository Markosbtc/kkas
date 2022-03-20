import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { format, parseISO } from 'date-fns';
import { first } from 'rxjs/operators';
import { Athlete } from 'src/app/shared/models/athlete';
import { Coach, CoachRef } from 'src/app/shared/models/coach';
import { AthleteService } from 'src/app/shared/services/athlete.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CoachService } from 'src/app/shared/services/coach.service';

@Component({
  selector: 'app-admin-athletes-form',
  templateUrl: './admin-athletes-form.component.html',
  styleUrls: ['./admin-athletes-form.component.scss'],
})
export class AdminAthletesFormComponent implements OnInit {
  id: string;
  athleteForm: FormGroup;
  isSubmitted: boolean = false;
  dbCoaches: Coach[] = [];
  athlete: Athlete = null;
  athletes: Athlete[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private coachService: CoachService,
    private athleteService: AthleteService,
    private toastController: ToastController,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCoaches();
    this.initForm();

    this.id = this.route.snapshot.queryParamMap.get('id');
    if (this.id) {
      this.getAthlete();
    }
  }

  initForm() {
    this.athleteForm = this.formBuilder.group({
      name: this.formBuilder.group({
        familyName: ['', [Validators.required]],
        givenName: ['', [Validators.required]],
        fullName: ['']
      }),
      image: [''], // TODO: file upload
      email: [''],
      url: [''],
      gender: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      deathDate: [],
      height: [''],
      weight: [''],
      coaches: this.formBuilder.array([]),
    });

    //this.setNewCoach();
  }

  // TODO: ne lehessen többször bkiválasztani ugyanazt az edzőt..
  // FIXME: ez itt nem jó, meg somehow display coach name in select.. 
  setNewCoach(coachRef?: CoachRef): void {
    const newCoach = this.formBuilder.group({
      coach: [coachRef ? coachRef : '', Validators.required],
      /* coach: this.formBuilder.group({
        name: this.formBuilder.group({
          familyName: [coachRef?.name?.familyName ? coachRef?.name?.familyName : '', [Validators.required]],
          givenName: [coachRef?.name?.givenName ? coachRef?.name?.givenName : '', [Validators.required]],
          fullName: [coachRef?.name?.fullName ? coachRef?.name?.fullName : '']
        }),
        id: [coachRef?.id ? coachRef?.id : ''],
        ref: [coachRef?.ref ? coachRef?.ref : ''],
        team: this.formBuilder.group({
          name: [coachRef?.team?.name ? coachRef?.team?.name : ''],
          alternateName: [coachRef?.team?.alternateName ? coachRef?.team?.alternateName : ''],
          city: [coachRef?.team?.city ? coachRef?.team?.city : ''],
          ref: [coachRef?.team?.ref ? coachRef?.team?.ref : ''],
          id: [coachRef?.team?.id ? coachRef?.team?.id : '']
        })
      }) */
    });
    this.coaches.push(newCoach);
  }

  /* 
  // coach: [coachRef ? coachRef : '', Validators.required],

   const newCoach = this.formBuilder.group({
      name: this.formBuilder.group({
        familyName: [coachRef?.name?.familyName ? coachRef?.name?.familyName : '', [Validators.required]],
        givenName: [coachRef?.name?.givenName ? coachRef?.name?.givenName : '', [Validators.required]],
        fullName: [coachRef?.name?.fullName ? coachRef?.name?.fullName : '']
      }),
      id: [coachRef?.id ? coachRef?.id : ''],
      ref: [coachRef?.ref ? coachRef?.ref : ''],
      team: this.formBuilder.group({
        name: [coachRef?.team?.name ? coachRef?.team?.name : ''],
        alternateName: [coachRef?.team?.alternateName ? coachRef?.team?.alternateName : ''],
        city: [coachRef?.team?.city ? coachRef?.team?.city : ''],
        ref: [coachRef?.team?.ref ? coachRef?.team?.ref : ''],
        id: [coachRef?.team?.id ? coachRef?.team?.id : '']
      })
    });
    this.coaches.push(newCoach);
   */

  removeCoach(index: number) {
    this.coaches.removeAt(index);
  }

  get coaches() {
    return this.athleteForm.controls.coaches as FormArray;
  }

  get birthdate() {
    return this.athleteForm.controls.birthDate;
  }

  formatDate(value: string): string {
    return format(parseISO(value), 'dd MMM yyyy');
  }

  getCoaches() {
    this.coachService.getCoaches().subscribe((res) => {
      this.dbCoaches = res;
    }, (err) => {
      console.error(err);
    });
  }

  getAthlete() {
    this.athleteService.getAthleteById(this.id).subscribe((res) => {
      this.athlete = res;
      console.log(res);
      this.initializeAthlete(res);
    });
  }

  initializeAthlete(athlete: Athlete) {
    this.athleteForm.patchValue({
      name: {
        familyName: athlete.name.familyName,
        givenName: athlete.name.givenName,
        fullName: athlete.name.fullName,
      },
      image: athlete.image,
      email: athlete.email,
      url: athlete.url,
      gender: athlete.gender,
      birthDate: athlete.birthDate,
      deathDate: athlete.deathDate,
      height: athlete.height,
      weight: athlete.weight
    });

    this.coaches.clear();
    for (const coach of athlete.coaches) {
      console.log(coach);

      this.setNewCoach(coach);
    }
  }

  async getUser() {
    const user = await this.authService.getUserProfile().pipe(first()).toPromise();
    return user;
  }

  async submitForm() {
    this.isSubmitted = true;
    if (this.athleteForm.valid) {
      const athleteToUpload: Athlete = await this.makeAthleteFromForm(this.athleteForm);
      // TODO: image ref
      if (this.id) { // update
        this.athleteService.updateAthleteById(this.id, athleteToUpload).then(() => {
          this.presentToast(this.translate.instant('shared.success'));
          this.isSubmitted = false;
          this.router.navigate(['/admin/athletes']);
        }).catch((err) => {
          console.error(err);
          this.presentToast(this.translate.instant('shared.error'), true);
        });
      } else { // create new 
        this.athleteService.addAthlete(athleteToUpload).then((res) => {
          this.presentToast(this.translate.instant('shared.success'));
          this.isSubmitted = false;
          this.router.navigate(['/admin/athletes']);
        }).catch((err) => {
          console.error(err);
          this.presentToast(this.translate.instant('shared.error'), true);
        });
      }
    } else {
      this.presentToast(this.translate.instant('shared.err_required'), true);
      return false;
    }
  }

  async makeAthleteFromForm(form: FormGroup): Promise<Athlete> {
    const athlete: Athlete = form.value;
    athlete.name.fullName = athlete.name.familyName + ' ' + athlete.name.givenName;

    if (this.athlete) {
      athlete.memberOf = this.athlete.memberOf;
    } else {
      const user = await this.getUser();
      athlete.memberOf = user.team;
    }
    return athlete;
  }

  async presentToast(message: string, error?: boolean) {
    const toast = await this.toastController.create({
      message,
      color: error ? 'danger' : 'primary',
      duration: 1500
    });
    toast.present();
  }

  //FIXME:
  async asd() {
    console.log(this.athleteForm.value);
  }

}
