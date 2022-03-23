import { Component, OnInit } from '@angular/core';
import { SportsTeam } from '../shared/models/sportsTeam';
import { TeamService } from '../shared/services/team.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  teams: SportsTeam[] = [];
  filteredTeams: SportsTeam[] = [];
  teamNameF: string;
  teamPlaceF: string;
  filters = {}

  constructor(
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.getTeams();
  }

  getTeams() {
    this.teamService.getSportTeams().subscribe((teams) => {
      this.teams = teams;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredTeams = _.filter(this.teams, _.conforms(this.filters));
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


  // FIXME:
  asd() {
    /* console.log(this.filters);
    console.log('filterred teams: ', this.filteredTeams); */


  }

}
