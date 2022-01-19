import { Component, OnInit } from '@angular/core';
import { Athlete } from '../shared/models/athlete';
import { AthleteService } from '../shared/services/athlete.service';
import { AuthService } from '../shared/services/auth.service';

//TODO: delete this component
//TODO: delete from HomeModule declarations
//TODO: delete from AppRoutingModule

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
})
export class TestingComponent implements OnInit {
  athlete: Athlete;

  constructor(
    private athleteService: AthleteService,
    public authService: AuthService
    ) { }

  ngOnInit() {
    this.athleteService.getAthletes().subscribe(res => {
      console.log(res);
      this.athlete = res[0];
      console.log(this.athlete);
    });
  }

}
