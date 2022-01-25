import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Athlete } from 'src/app/shared/models/athlete';

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.scss'],
})
export class AthleteComponent implements OnInit {
  title: string;
  id: string;
  athlete: Athlete;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    if (history.state.data) {
      this.athlete = history.state.data.athlete;
    } else {
      //TODO: getAthleteById()...
    }

    
  }

}
