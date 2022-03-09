import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SportsTeam } from 'src/app/shared/models/sportsTeam';
import { format, parseISO } from 'date-fns';
import { IonAccordionGroup, ToastController } from '@ionic/angular';
import { Constants } from 'src/app/shared/constants/constants';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TeamService } from 'src/app/shared/services/team.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-teams',
  templateUrl: './admin-teams.component.html',
  styleUrls: ['./admin-teams.component.scss'],
})
export class AdminTeamsComponent implements OnInit {
  myteam: boolean = false;
  team: SportsTeam;
  teamForm: FormGroup;
  isSubmitted: boolean = false;
  captainDateValue: string;
  presidentDateValue: string;

  @ViewChild(IonAccordionGroup) accordionGroup: IonAccordionGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private teamService: TeamService,
    private toastController: ToastController,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.initForm();
    this.authService.getUserProfile().subscribe((res) => {
      if (res) {
        const team = res.userData.team;
        console.log(res);
        console.log(team);
        if (team === '0') {
          this.myteam = true;
        } else {
          this.myteam = false;
          // TODO: get && display current team stats
        }
      } else {
        this.myteam = false;
        console.log('no user');
      }
    });
  }

  initForm() {
    this.teamForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      alternateName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      address: ['', [Validators.required]],
      email: this.formBuilder.array([]),
      url: this.formBuilder.array([]),
      telephone: this.formBuilder.array([]),
      logo: [''], // TODO: file upload
      captain: this.formBuilder.group({
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
        deathDate: []
      }),
      president: this.formBuilder.group({
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
        deathDate: []
      }),
      coaches: this.formBuilder.array([])
    });
    // this.setNewEmail();
    // this.setNewUrl();
    // this.setNewTelephone();
  }

  setNewEmail(emailAddress?: string): void {
    const newMail = this.formBuilder.group({
      email: [emailAddress ? emailAddress : '', Validators.pattern(Constants.EMAIL_PATTERN)],
    });

    this.emails.push(newMail);
  }

  removeEmail(index: number) {
    this.emails.removeAt(index);
  }

  get emails() {
    return this.teamForm.controls.email as FormArray;
  }

  setNewUrl(url?: string): void {
    const newurl = this.formBuilder.group({
      url: [url ? url : ''],
    });

    this.url.push(newurl);
  }

  removeUrl(index: number) {
    this.url.removeAt(index);
  }

  get url() {
    return this.teamForm.controls.url as FormArray;
  }

  setNewTelephone(number?: string): void {
    const newphone = this.formBuilder.group({
      telephone: [number ? number : '', Validators.pattern(Constants.PHONE_PATTERN)],
    });

    this.phones.push(newphone);
  }

  removeTelephone(index: number) {
    this.phones.removeAt(index);
  }

  get phones() {
    return this.teamForm.controls.telephone as FormArray;
  }

  setNewCoach(): void {
    const newcoach = this.formBuilder.group({
      name: this.formBuilder.group({
        familyName: ['', [Validators.required]],
        givenName: ['', [Validators.required]],
        fullName: ['']
      }),
      image: [''], // TODO: file upload
      email: [''],
      url: [''],
      gender: [''],
      birthDate: ['', [Validators.required]],
      deathDate: [],
      licenceId: ['', [Validators.required]],
      licenceValidFrom: ['', [Validators.required]],
      licenceValidTo: [],
      licenceLevel: ['', [Validators.required]],
      roleName: [''],
      note: [''],
      team: []
    });

    this.coaches.push(newcoach);
  }

  removeCoach(index: number) {
    this.coaches.removeAt(index);
  }

  get coaches() {
    return this.teamForm.controls.coaches as FormArray;
  }

  //FIXME: for testing 
  asd() {
    console.log(this.teamForm.value);
    console.log(this.teamForm.get('captain.birthDate').hasError('required'));
  }

  registerTeam() {
    this.myteam = false;
    this.initForm();
  }

  formatDate(value: string): string {
    // import { Timestamp } from "@angular/fire/firestore"; 
    // Timestamp.fromDate(new Date("December 10, 1815"))
    return format(parseISO(value), 'dd MMM yyyy');
  }

  get errorControl() {
    return this.teamForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.teamForm.valid) {
      const teamToUpload: SportsTeam = this.makeTeamFromForm(this.teamForm);

      this.teamService.addSportsTeam(teamToUpload).then((res) => {
        // TODO: pass image refs 
        this.teamService.getSportsTeamSnapshot(res).then((docSnap) => {
          if (docSnap.exists()) {
            const updateTeam = docSnap.data();
            updateTeam.coaches?.forEach(coach => {
              coach.team = docSnap.ref;
            });
            this.teamService.updateSportsTeam(docSnap.ref, updateTeam).then(() => {
              this.presentToast(this.translate.instant('shared.success'));
              this.teamForm.reset();
              // TODO: displayTeam = true or sth like that
            }).catch((err) => {
              // console.error(err);
              this.presentToast(this.translate.instant('shared.error', true));
            });
          } else {
            console.log("No such document!");
          }
        }).catch((err) => {
          // console.error(err);
          this.presentToast(this.translate.instant('shared.error', true));
        });
      }).catch((err) => {
        // console.error(err);
        this.presentToast(this.translate.instant('shared.error', true));
      });
    } else {
      console.log('Please provide all the required values!', this.teamForm.status);
      console.log(this.teamForm);

      // open accordions
      this.accordionGroup.value = ["captain", "president"];
      return false;
    }
  }

  makeTeamFromForm(teamForm: FormGroup): SportsTeam {
    const team: SportsTeam = teamForm.value;
    team.captain.name.fullName = team.captain.name.familyName + ' ' + team.captain.name.givenName;
    team.president.name.fullName = team.president.name.familyName + ' ' + team.president.name.givenName;
    team.coaches?.forEach(coach => {
      coach.name.fullName = coach.name.familyName + ' ' + coach.name.givenName;
    });

    return team;
  }

  async presentToast(message: string, error?: boolean) {
    const toast = await this.toastController.create({
      message,
      color: error ? 'danger' : 'primary',
      duration: 1500
    });
    toast.present();
  }

}
