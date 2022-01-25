import { Component, OnInit } from '@angular/core';
import { Athlete } from 'src/app/shared/models/athlete';
import { Gender } from 'src/app/shared/models/person';

@Component({
  selector: 'app-athlete-list',
  templateUrl: './athlete-list.component.html',
  styleUrls: ['./athlete-list.component.scss'],
})
export class AthleteListComponent implements OnInit {
  athletes: Athlete[] = [];

  constructor() { }

  ngOnInit() {
    this.athletes.push(
      {
        id: "athletes uinque id",
        name: {
          familyName: "Subotic",
          givenName: "Marko",
          fullName: "Subotic Marko"
        },
        //image?: any,
        //email?: string,
        //url?: string,
        gender: Gender.GenderType.MALE,
        birthDate: new Date(),
        //deathDate?: Date,
        //height?: number,
        //weight?: number,
        //coach?: Coach[],
        memberOf: {
          id: "id of team",
          name: "Tisin Cvet",
          alternateName: "TSC",
          address: "string",
          //email?: string[],
          //url?: string[],
          //telephone?: string[],
          //logo?: any,
          captain: {
            name: {
              familyName: "string",
              givenName: "string",
            },
            gender: Gender.GenderType.FEMALE,
            birthDate: new Date(),
          },
          president: {
            name: {
              familyName: "string",
              givenName: "string",
            },
            gender: Gender.GenderType.FEMALE,
            birthDate: new Date(),
          },
          //coaches?: Coach[],
          //athletes?: Athlete[]
        },
        //achievements?: Achievement[]
      }
    );
  }

}
