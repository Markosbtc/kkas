import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonFab, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Event } from 'src/app/shared/models/event';
import { Race } from 'src/app/shared/models/race';
import { Result } from 'src/app/shared/models/result';
import { EventService } from 'src/app/shared/services/event.service';
import { RaceService } from 'src/app/shared/services/race.service';
import { ResultService } from 'src/app/shared/services/result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  @Input() raceId: string;
  @ViewChild('ifab') fab: IonFab;

  race: Race;
  results: Result[] = [];
  racenb: number;
  event: Event;

  constructor(
    private resultService: ResultService,
    private eventService: EventService,
    private raceService: RaceService,
    private translate: TranslateService,
    private toastController: ToastController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    if (this.raceId) {
      this.getRace();
      this.getResults();
    }
  }

  getRace() {
    this.raceService.getRaceById(this.raceId).subscribe((res) => {
      this.race = res;
      this.racenb = res.number;
      this.getEvent();
    });
  }

  getEvent() {
    this.eventService.getEventById(this.race.eventId).subscribe((resp) => {
      this.event = resp;
    });
  }

  getResults() {
    this.resultService.getResultsByRaceId(this.raceId).subscribe((response) => {
      this.results = response;
    });
  }

  close() {
    this.modalController.dismiss();
  }

  nextRace() {
    this.racenb += 1;
    this.searchRace();
  }

  previousRace() {
    this.racenb -= 1;
    this.searchRace();
  }

  searchRace() {
    this.raceService.getRaceByEventIdAndRaceNumber(this.event.id, this.racenb).subscribe((res) => {
      if (res.length > 0) {
        this.raceId = res[0].id;
        this.getRace();
        this.getResults();
      } else {
        this.presentToast(this.translate.instant('result.err_race_number'));
        this.racenb = this.race.number;
      }
      this.fab.activated = true;
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      color: 'danger',
      duration: 1500
    });
    toast.present();
  }

}
