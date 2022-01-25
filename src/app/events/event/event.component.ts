import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event, EventCategory, EventStatus } from 'src/app/shared/models/event';
import { Gender } from 'src/app/shared/models/person';
import { AgeGroup, Boat, Distance, RaceT } from 'src/app/shared/models/race';
import { Result, ResultStatus } from 'src/app/shared/models/result';
import { Athlete } from 'src/app/shared/models/athlete';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  id: string;
  title: string; //TODO: get event by id and assign event name to title
  event: Event;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;

    // --
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
        address: 'Ada Cigalnija 13'
      },
      /* participation?: {
        teams: SportsTeam[],
        athletes: Athlete[],
      }, */
      eventCategory: EventCategory.EventCategoryType.national,
      races: [
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
          results: [
            {
              id: 'result id',
              raceId: 'race id string',
              created: new Date(),
              modified: new Date(),
              competitor: {
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
            }
          ],
          progressingScheme: 'Döntő', 
          /*  note?: string,
           startReferee?: Referee[],
           finishReferee?: Referee[],
           referee?: Referee[], */
        }
      ],
    }

    // -- 
  }

}
