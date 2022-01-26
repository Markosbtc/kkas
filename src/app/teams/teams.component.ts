import { Component, OnInit } from '@angular/core';
import { Gender } from '../shared/models/person';
import { SportsTeam } from '../shared/models/sportsTeam';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  teams: SportsTeam[] = [];
  teamName: string;
  teamPlace: string;

  constructor() { }

  ngOnInit() {
    this.teams.push(
      {
        id: "random team id",
        name: "Tisin Cvet",
        alternateName: "TSC",
        address: "address",
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
        //athletes?: Athlete[],
      }
    )
  }

}
