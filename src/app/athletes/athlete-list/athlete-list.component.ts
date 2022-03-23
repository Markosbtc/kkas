import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonAccordionGroup } from '@ionic/angular';
import { Athlete } from 'src/app/shared/models/athlete';
import { SportsTeam } from 'src/app/shared/models/sportsTeam';
import { AthleteService } from 'src/app/shared/services/athlete.service';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-athlete-list',
  templateUrl: './athlete-list.component.html',
  styleUrls: ['./athlete-list.component.scss'],
})
export class AthleteListComponent implements OnInit, AfterViewInit {
  teamId: string;
  team: SportsTeam;
  athletes: Athlete[] = [];

  athleteNameF: string;
  yearF: number;
  teamNameF: string;

  @ViewChild(IonAccordionGroup) accordionGroup: IonAccordionGroup;

  constructor(
    private athleteService: AthleteService,
    private teamService: TeamService,
  ) { }

  ngOnInit() {

  }

  getAthletes() {
    this.athleteService.getAthletes().subscribe((res) => {
      this.athletes = res;
      console.log(res);
    });
  }

  ngAfterViewInit(): void {
    if (history.state.teamId) {
      this.teamId = history.state.teamId;
      this.athleteService.getAthletesByTeamId(this.teamId).subscribe((res) => {
        this.athletes = res;
      });
      if (history.state.teamName) {
        this.teamNameF = history.state.teamName;
        this.accordionGroup.value = "filter";
      } else {
        this.teamService.getSportsTeamById(this.teamId).subscribe((res) => {
          this.team = res;
          this.teamNameF = res.name;
          this.accordionGroup.value = "filter";
        });
      }
    } else {
      this.getAthletes();
    }
  }

  clearTeamName() {
    if (this.teamId) {
      this.getAthletes();
    }
  }

}
