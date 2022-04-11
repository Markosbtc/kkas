import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/shared/models/event';
import { AgeGroup, Boat, Distance, Race } from 'src/app/shared/models/race';
import { ModalController } from '@ionic/angular';
import { ResultComponent } from '../result/result.component';
import { EventService } from 'src/app/shared/services/event.service';
import { RaceService } from 'src/app/shared/services/race.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  id: string;
  title: string = "";
  event: Event;
  races: Race[] = [];

  eventTeamF: string;
  athleteF: string;
  boatF: string;
  ageGroupF: string;
  distanceF: string;
  genderF: string;

  boats = Boat.BOAT_TYPES;
  distances = Distance.DISTANCES;
  ageGroups = AgeGroup.AGE_GROUPS;

  constructor(
    private eventService: EventService,
    private raceService: RaceService,
    private route: ActivatedRoute,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.eventService.getEventById(this.id).subscribe((res) => {
        this.event = res;
        this.title = res.name;
      });
      this.raceService.getRacesByEventId(this.id).subscribe((r) => {
        this.races = r;
      });
    }
  }

  async presentModal(raceId: string) {
    const modal = await this.modalController.create({
      component: ResultComponent,
      componentProps: { raceId: raceId },
      // presentingElement?: HTMLElement,
      // showBackdrop?: boolean,
      // backdropDismiss?: boolean,
      cssClass: 'modal'
      // animated?: boolean,
      // swipeToClose?: boolean,

      // mode?: 'ios' | 'md',
      // keyboardClose?: boolean,
      // id?: string,

      // enterAnimation?: AnimationBuilder,
      // leaveAnimation?: AnimationBuilder
    });
    return await modal.present();
  }


}
