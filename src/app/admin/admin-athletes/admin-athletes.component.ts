import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Athlete } from 'src/app/shared/models/athlete';
import { Coach } from 'src/app/shared/models/coach';
import { AthleteService } from 'src/app/shared/services/athlete.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CoachService } from 'src/app/shared/services/coach.service';

@Component({
  selector: 'app-admin-athletes',
  templateUrl: './admin-athletes.component.html',
  styleUrls: ['./admin-athletes.component.scss'],
})
export class AdminAthletesComponent implements OnInit {
  isSubmitted: boolean = false;
  dbCoaches: Coach[] = [];
  athletes: Athlete[] = [];

  constructor(
    private authService: AuthService,
    private coachService: CoachService,
    private athleteService: AthleteService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getAthletes();
    this.getCoaches();
  }

  getCoaches() {
    this.coachService.getCoaches().subscribe((res) => {
      this.dbCoaches = res;
    }, (err) => {
      console.error(err);
    });
  }

  getAthletes() {
    this.authService.getUserProfile().subscribe((user) => {
      this.athleteService.getAthletesByTeamId(user.team.id).subscribe((res) => {
        this.athletes = res;
      });
    });
  }

  registerAthlete() {
    this.router.navigate(['/admin/athlete']);
  }


  //FIXME:
  async asd() {
    const teamId = 'Kq0xPJWSYr7UHK2gk5xC';
    this.athleteService.getAthletesByTeamId(teamId).subscribe((s) => {
      console.log(s);

    })
    // console.log(await this.getUser());
  }

}
