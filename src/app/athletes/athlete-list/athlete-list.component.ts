import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonAccordionGroup } from '@ionic/angular';
import { Athlete } from 'src/app/shared/models/athlete';
import { Gender } from 'src/app/shared/models/person';
import { SportsTeam } from 'src/app/shared/models/sportsTeam';

@Component({
  selector: 'app-athlete-list',
  templateUrl: './athlete-list.component.html',
  styleUrls: ['./athlete-list.component.scss'],
})
export class AthleteListComponent implements OnInit, AfterViewInit {
  athletes: Athlete[] = [];
  team: SportsTeam;
  athleteName: string;
  teamName: string;
  year: number;

  @ViewChild(IonAccordionGroup) accordionGroup: IonAccordionGroup;

  constructor() { }

  ngOnInit() {
    // --
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
          city: 'Beograd',
        },
        //achievements?: Achievement[]
      }
    );
    // --

  }

  ngAfterViewInit(): void {
    if (history.state.data) {
      this.team = history.state.data.team;
      this.accordionGroup.value = "filter";
      this.teamName = this.team.name;
    }    
  }

}
