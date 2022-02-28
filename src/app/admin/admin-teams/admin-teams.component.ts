import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coach } from 'src/app/shared/models/coach';
import { Gender } from 'src/app/shared/models/person';
import { SportsTeam } from 'src/app/shared/models/sportsTeam';
import { format, parseISO } from 'date-fns';
import { IonAccordionGroup } from '@ionic/angular';
import { Constants } from 'src/app/shared/constants/constants';

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

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    //TODO: check if logged user has role: registered user 
    //                -> then check if user is a member of SportTeam.captain|president|coaches
    //                    -> then team == SportTeam

    this.myteam = true;
    this.initForm();
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
        gender: [''],
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
      licenceValidTo: [''],
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
  }

  registerTeam() { //TODO:
    this.myteam = true;
    this.initForm();
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.teamForm.get('dob').setValue(date, {
      onlyself: true
    })
  }

  formatDate(value: string): string {
    return format(parseISO(value), 'dd MMM yyyy');;
  }

  get errorControl() {
    return this.teamForm.controls;
  }

  submitForm() {
    //TODO: save team, then fill in the team field for the trainers
    this.isSubmitted = true;
    if (!this.teamForm.valid) {
      console.log('Please provide all the required values!', this.teamForm.status);
      // open accordions
      this.accordionGroup.value = ["captain", "president"];
      return false;
    } else {
      // TODO: submit form
      // TODO: pass image refs 
      // TODO: fullnames = family+given
      console.log(this.teamForm.value)
    }
  }

  exampleteam: SportsTeam = {
    id: "string",
    name: "TeamName",
    alternateName: "Team second Name",         //opt
    address: "address 12/bb",
    email: ["asd@a.com", "b@b.com"],  //opt
    url: ["exampleURl"],              //opt
    telephone: ["0629898525232"],
    //logo: any,                      //opt
    captain: {
      name: {
        familyName: "Example",
        givenName: "Captain",
      },
      gender: Gender.GenderType.MALE,
      birthDate: new Date(),
    },
    president: {
      name: {
        familyName: "President",
        givenName: "El",
      },
      gender: Gender.GenderType.FEMALE,
      birthDate: new Date(),
    },
    coaches: [
      {
        name: {
          familyName: "Coach",
          givenName: "Mr",
        },
        gender: Gender.GenderType.MALE,
        birthDate: new Date(),
        licenceId: "licenceId",
        licenceValidFrom: new Date(),
        licenceValidTo: new Date(),
        licenceLevel: "licenceLevel",
        note: "note",
        roleName: "roleName",
        // team: SportsTeam
      } as Coach
    ],
    // athletes?: Athlete[],            //skip here, xonfigure this in admin-athletes component
  }



}
