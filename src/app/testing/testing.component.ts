import { Component, OnInit } from '@angular/core';
import { Athlete } from '../shared/models/athlete';
import { AthleteService } from '../shared/services/athlete.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
})
export class TestingComponent implements OnInit {
  athlete: Athlete;

  constructor(private athleteService: AthleteService) { }

  ngOnInit() {
    this.athleteService.getAthletes().subscribe(res => {
      console.log(res);

    });
    this.newathlete()
  }

  newathlete(){
    this.athlete = {
      birthDate: new Date(),
      gender: 'male',
      memberOf: null,
      name: {
        familyName: 'Teszt',
        givenName: 'Elek',
      }
    }
    console.log(this.athlete);
    
    
    //this.athleteService.addAthlete(this.athlete);
  }
}
