import { Component, OnInit } from '@angular/core';
import { Event, EventCategory, EventStatus } from 'src/app/shared/models/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  events: Event[] = [];

  constructor() { }

  ngOnInit() {
    this.events.push({
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
      //races?: Race[],
    })
  }

}
