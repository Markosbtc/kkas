import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Athlete } from 'src/app/shared/models/athlete';
import { Event } from 'src/app/shared/models/event';
import { Gender } from 'src/app/shared/models/person';
import { AgeGroup, Boat, Distance, Race, RaceT } from 'src/app/shared/models/race';
import { ResultStatus } from 'src/app/shared/models/result';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  @Input() race: Race;


  event: Event;

  constructor(
    //private eventService: Eventservice,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    //FIXME: delete: --
    this.race = {
      id: 'race id string',
      eventId: 'eventId',
      number: 1,
      distance: Distance.DistanceType[1000],
      boat: Boat.BoatType.k1,
      gender: Gender.GenderType.MALE,
      age: AgeGroup.AgeGroupType.senior,
      type: RaceT.RaceType.final,
      time: '11:55',
      //day: new Date(),
      results: [
        {
          id: 'result id',
          raceId: 'race id string',
          created: new Date(),
          modified: new Date(),
          competitor: {
            name: {
              familyName: 'Subotic',
              givenName: 'Marko',
              //fullName?: string
            },
            gender: Gender.GenderType.MALE,
            /* height?: number,
            weight?: number,
            coach?: Coach[], */
            memberOf: {
              name: 'KRK Tisin Cvet',
              alternateName: 'TSC',
              /* captain: Person,
              president: Person, */
            },
            // achievements?: Achievement[]
          } as Athlete,
          resultStatus: ResultStatus.ResultStatusType.official,
          lane: 3,
          rank: 1,
          performance: '3:35',
          points: 10,
          //disqualificationReason?: string,
        },
        {
          id: 'result id 2',
          raceId: 'race id string',
          created: new Date(),
          modified: new Date(),
          competitor: {
            name: {
              familyName: 'Teszt',
              givenName: 'Elek',
            },
            gender: Gender.GenderType.MALE,
            memberOf: {
              name: 'KRK Tisin Cvet',
              alternateName: 'TSC',
            },
          } as Athlete,
          resultStatus: ResultStatus.ResultStatusType.official,
          lane: 5,
          rank: 2,
          performance: '3:37',
          points: 8,
        }
      ],
      progressingScheme: 'First 3 to FA, rest out',
      /*  note?: string,
       startReferee?: Referee[],
       finishReferee?: Referee[],
       referee?: Referee[], */
    }
    console.log(this.race);
    //--

    this.getEvent()


  }

  getEvent() {
    //TODO: this.event = this.eventService.getEventById(this.race.eventId);
  }

  close() {
    this.modalController.dismiss();
  }

}
