import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonAccordionGroup } from '@ionic/angular';
import { Athlete } from 'src/app/shared/models/athlete';
import { SportsTeam } from 'src/app/shared/models/sportsTeam';
import { AthleteService } from 'src/app/shared/services/athlete.service';
import { TeamService } from 'src/app/shared/services/team.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-athlete-list',
  templateUrl: './athlete-list.component.html',
  styleUrls: ['./athlete-list.component.scss'],
})
export class AthleteListComponent implements OnInit, AfterViewInit {
  teamId: string;
  team: SportsTeam;
  athletes: Athlete[] = [];
  filteredAthletes: Athlete[] = [];

  athleteNameF: string;
  yearF: number;
  teamNameF: string;
  genderF: string;
  filters = {}

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
      this.applyFilters();
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

  applyFilters() {
    this.filteredAthletes = _.filter(this.athletes, _.conforms(this.filters));
  }

  removeFilter(property: string) {
    delete this.filters[property];
    this[property] = null;
    this.applyFilters();
  }

  filterIncludes(property: string, rule: any) {
    this.filters[property] = val => _.toLower(val).includes(_.toLower(rule));
    this.applyFilters();
  }

  filterExact(property: string, rule: any) {
    this.filters[property] = val => _.toLower(val) == _.toLower(rule);
    this.applyFilters();
  }

  genderSelectChange(event: any) {
    if (event.detail.value) {
      this.filterExact('gender', this.genderF);
    } else {
      this.removeFilter('gender');
    }
  }

}
