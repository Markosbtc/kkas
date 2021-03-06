import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SportsTeam } from 'src/app/shared/models/sportsTeam';
import { format, parseISO } from 'date-fns';
import { IonAccordionGroup, ToastController } from '@ionic/angular';
import { Constants } from 'src/app/shared/constants/constants';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TeamService } from 'src/app/shared/services/team.service';
import { TranslateService } from '@ngx-translate/core';
import { CoachService } from 'src/app/shared/services/coach.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Coach } from 'src/app/shared/models/coach';

@Component({
  selector: 'app-admin-teams-form',
  templateUrl: './admin-teams-form.component.html',
  styleUrls: ['./admin-teams-form.component.scss'],
})
export class AdminTeamsFormComponent implements OnInit {
  id: string;
  team: SportsTeam;
  teamForm: FormGroup;
  isSubmitted: boolean = false;

  @ViewChild(IonAccordionGroup) accordionGroup: IonAccordionGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private teamService: TeamService,
    private coachService: CoachService,
    private toastController: ToastController,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
    this.id = this.route.snapshot.queryParamMap.get('id');
    if (this.id) {
      this.getTeamInfo();
    }
  }

  initForm() {
    this.teamForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      alternateName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      address: this.formBuilder.group({
        zip: ['', [Validators.required]],
        city: ['', [Validators.required]],
        address: ['', [Validators.required]]
      }),
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

    this.setNewEmail();
    this.setNewUrl();
    this.setNewTelephone();
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

  setNewCoach(coach?: Coach): void {
    const newcoach = this.formBuilder.group({
      name: this.formBuilder.group({
        familyName: [coach?.name?.familyName ? coach?.name?.familyName : '', [Validators.required]],
        givenName: [coach?.name?.givenName ? coach?.name?.givenName : '', [Validators.required]],
        fullName: [coach?.name?.fullName ? coach?.name?.fullName : '']
      }),
      image: [coach?.image ? coach?.image : ''], // TODO: file upload
      email: [coach?.email ? coach?.email : ''],
      url: [coach?.url ? coach?.url : ''],
      gender: [coach?.gender ? coach?.gender : ''],
      birthDate: [coach?.birthDate ? coach?.birthDate : '', [Validators.required]],
      deathDate: [coach?.deathDate ? coach?.deathDate : null],
      licenceId: [coach?.licenceId ? coach?.licenceId : '', [Validators.required]],
      licenceValidFrom: [coach?.licenceValidFrom ? coach?.licenceValidFrom : '', [Validators.required]],
      licenceValidTo: [coach?.licenceValidTo ? coach?.licenceValidTo : null],
      licenceLevel: [coach?.licenceLevel ? coach?.licenceLevel : '', [Validators.required]],
      roleName: [coach?.roleName ? coach?.roleName : ''],
      note: [coach?.note ? coach?.note : ''],
      team: [coach?.team ? coach?.team : null]
    });

    this.coaches.push(newcoach);
  }

  removeCoach(index: number) {
    this.coaches.removeAt(index);
  }

  get coaches() {
    return this.teamForm.controls.coaches as FormArray;
  }

  get errorControl() {
    return this.teamForm.controls;
  }

  getTeamInfo() {
    this.teamService.getSportsTeamById(this.id).subscribe((res) => {
      this.team = res;
      this.initializeTeam(res);
    })
  }

  initializeTeam(team: SportsTeam) {
    this.teamForm.patchValue({
      name: team.name,
      alternateName: team.alternateName,
      address: {
        zip: team.address.zip,
        city: team.address.city,
        address: team.address.address,
      },
      logo: team.logo,
      captain: {
        name: {
          familyName: team.captain.name.familyName,
          givenName: team.captain.name.givenName,
          fullName: team.captain.name.fullName,
        },
        image: team.captain.image,
        email: team.captain.email,
        url: team.captain.url,
        gender: team.captain.gender,
        birthDate: team.captain.birthDate,
        deathDate: team.captain.deathDate,
      },
      president: {
        name: {
          familyName: team.president.name.familyName,
          givenName: team.president.name.givenName,
          fullName: team.president.name.fullName,
        },
        image: team.president.image,
        email: team.president.email,
        url: team.president.url,
        gender: team.president.gender,
        birthDate: team.president.birthDate,
        deathDate: team.president.deathDate,
      }
    });

    this.emails.clear();
    this.url.clear();
    this.phones.clear();
    this.coaches.clear();

    for (const email of team.email) {
      this.setNewEmail(email);
    }

    for (const url of team.url) {
      this.setNewUrl(url);
    }

    for (const telephone of team.telephone) {
      this.setNewTelephone(telephone);
    }

    for (const coach of team.coaches) {
      this.setNewCoach(coach);
    }

  }

  formatDate(value: string): string {
    // import { Timestamp } from "@angular/fire/firestore"; 
    // Timestamp.fromDate(new Date("December 10, 1815"))
    return format(parseISO(value), 'dd MMM yyyy');
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.teamForm.valid) {
      const teamToUpload: SportsTeam = this.makeTeamFromForm();
      if (this.id) { // update team
        // FIXME: check this part, update coaches problematic:
        // updates team.coaches fine, but
        // firestore coaches collection does not update. Maybe cloud function? 
        this.teamService.updateSportsTeamById(this.id, teamToUpload).then(() => {
          this.presentToast(this.translate.instant('shared.success'));
          this.isSubmitted = false;
          this.router.navigate(['admin/teams']);
        }).catch((err) => {
          // console.error(err);
          this.presentToast(this.translate.instant('shared.error'), true);
        });
      } else { // new team
        this.teamService.addSportsTeam(teamToUpload).then((res) => {
          // TODO: pass image refs 
          this.teamService.getSportsTeamSnapshot(res).then((docSnap) => {
            if (docSnap.exists()) {
              // set coach.team
              const updateTeam: SportsTeam = docSnap.data();
              updateTeam.coaches?.forEach(coach => {
                coach.team = {
                  name: updateTeam.name,
                  alternateName: updateTeam.alternateName,
                  city: updateTeam.address.city,
                  ref: docSnap.ref,
                  id: docSnap.id
                };
                // add coaches to db
                this.coachService.addCoach(coach).catch((err) => {
                  // console.error(err);
                  this.presentToast(this.translate.instant('shared.error'), true);
                });
              });
              this.teamService.updateSportsTeam(docSnap.ref, updateTeam).then(() => {
                // change user's team
                const team = {
                  name: updateTeam.name,
                  alternateName: updateTeam.alternateName,
                  city: updateTeam.address.city,
                  ref: docSnap.ref,
                  id: docSnap.id
                };
                this.authService.updateUserProfile(team).then(() => {
                  this.presentToast(this.translate.instant('shared.success'));
                  this.isSubmitted = false;
                  this.router.navigate(['admin/teams']);
                }).catch((err) => {
                  // console.error(err);
                  this.presentToast(this.translate.instant('shared.error'), true);
                });
              }).catch((err) => {
                // console.error(err);
                this.presentToast(this.translate.instant('shared.error'), true);
              });
            } else {
              console.log("No such document!");
            }
          }).catch((err) => {
            // console.error(err);
            this.presentToast(this.translate.instant('shared.error'), true);
          });
        }).catch((err) => {
          // console.error(err);
          this.presentToast(this.translate.instant('shared.error'), true);
        });
      }

    } else {
      console.log('Please provide all the required values!', this.teamForm.status);
      // console.log(this.teamForm);
      this.presentToast(this.translate.instant('shared.err_required'), true);
      // open accordions
      this.accordionGroup.value = ["captain", "president"];
      return false;
    }
  }

  makeTeamFromForm(): SportsTeam {
    const team: SportsTeam = this.teamForm.value;
    team.captain.name.fullName = team.captain.name.familyName + ' ' + team.captain.name.givenName;
    team.president.name.fullName = team.president.name.familyName + ' ' + team.president.name.givenName;
    team.coaches?.forEach(coach => {
      coach.name.fullName = coach.name.familyName + ' ' + coach.name.givenName;
    });

    team.email = [];
    this.teamForm.get('email').value.forEach(e => {
      if (e.email) {
        team.email.push(e.email);
      }
    });

    team.telephone = [];
    this.teamForm.get('telephone').value.forEach(t => {
      if (t.telephone) {
        team.telephone.push(t.telephone);
      }
    });

    team.url = [];
    this.teamForm.get('url').value.forEach(w => {
      if (w.url) {
        team.url.push(w.url);
      }
    });

    if (this.team) {
      team.coaches.forEach(coach => {
        coach.team = {
          name: this.team.name,
          alternateName: this.team.alternateName,
          city: this.team.address.city,
          id: this.id,
        }
      });
    }

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


  //FIXME:
  asd() {
    // console.log(this.teamForm.value);
    // console.log(this.makeTeamFromForm(this.teamForm));
    console.log(this.makeTeamFromForm());
  }

}
