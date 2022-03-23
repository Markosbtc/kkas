import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event, EventCategory, EventStatus } from 'src/app/shared/models/event';
import { Gender } from 'src/app/shared/models/person';
import { AgeGroup, Boat, Distance, Race, RaceT, ResultStatus } from 'src/app/shared/models/race';
import { Athlete } from 'src/app/shared/models/athlete';
import { ModalController } from '@ionic/angular';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  id: string;
  title: string = "";
  event: Event;

  eventTeamF: string;
  boatF: string;
  ageGroupF: string;
  distanceF: string;
  genderF: string;

  boats = Boat.BOAT_TYPES;
  distances = Distance.DISTANCES;
  ageGroups = AgeGroup.AGE_GROUPS;

  constructor(
    private route: ActivatedRoute,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      // TODO: this.event = valamiService.getEventById(this.id);
      // TODO: get event by id and assign event name to title
    }


    // -- FIXME: delete this part
    this.event = {
      id: 'eventId',
      name: 'Otvoreno prvenstvo Srbije',
      alternateName: 'string',
      description: 'description lorem ipsunn asd asa',
      location: 'Ada Ciganlija',
      url: 'urlofevent',
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      eventStatus: EventStatus.EventStatusType.scheduled,
      organizer: {
        name: 'KSS',
        address: {
          zip: '3030',
          city: 'Beograd',
          address: 'Ada Cigalnija 13'
        }
      },
      /* participation?: {
        teams: SportsTeam[],
        athletes: Athlete[],
      }, */
      eventCategory: EventCategory.EventCategoryType.national,
      //races?: Race[],
    }

    this.event.races = [
      {
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
        resultStatus: ResultStatus.ResultStatusType.official,
        results: [
          {
            id: 'result id',
            raceId: 'race id string',
            created: new Date(),
            modified: new Date(),
            competitor: {
              name: {
                familyName: 'string',
                givenName: 'string',
                //fullName?: string
              },
              gender: 'male',
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
            lane: 3,
            rank: 1,
            performance: '3:35',
            points: 10,
            //disqualificationReason?: string,
          }
        ],
        progressingScheme: 'Döntő',
        /*  note?: string,
         startReferee?: Referee[],
         finishReferee?: Referee[],
         referee?: Referee[], */
      }
    ]
    // --



  }

  async presentModal(race: Race) {
    const modal = await this.modalController.create({
      component: ResultComponent,
      componentProps: { race: race },
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
