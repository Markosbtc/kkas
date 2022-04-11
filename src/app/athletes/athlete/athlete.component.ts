import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Achievement } from 'src/app/shared/models/achievement';
import { Athlete } from 'src/app/shared/models/athlete';
import { EventCategory } from 'src/app/shared/models/event';
import { Boat, Distance, RaceT } from 'src/app/shared/models/race';
import { AthleteService } from 'src/app/shared/services/athlete.service';

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.scss'],
})
export class AthleteComponent implements OnInit {
  title: string;
  id: string;
  athlete: Athlete;
  achievements: Achievement[] = []; // TODO: achievement service, get achievements by athlete.id 

  boats = Boat.BOAT_TYPES;
  distances = Distance.DISTANCES;
  raceTypes = RaceT.RACE_TYPES;
  eventTypes = EventCategory.EVENTS;

  eventNameF: string;
  placementF: any;
  boatF: string;
  distanceF: string;
  raceTypeF: string;
  eventTypeF: string;

  constructor(
    private route: ActivatedRoute,
    private athleteService: AthleteService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.athleteService.getAthleteById(this.id).subscribe((res) => {
        this.athlete = res;
        console.log(res);

        this.title = res.name.fullName ? res.name.fullName : (res.name.familyName + ' ' + res.name.givenName);
      });
    }

  }

}
