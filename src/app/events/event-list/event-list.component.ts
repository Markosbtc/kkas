import { Component, OnInit } from '@angular/core';
import { Event, EventCategory, EventStatus } from 'src/app/shared/models/event';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  events: Event[] = [];

  // filters:
  eventName: string;
  eventPlace: string;
  eventYear; //TODO: type? Date/string/number?

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.getEvents();
    this.sortEventsByDate();
  }

  getEvents() {
    this.eventService.getEvents().subscribe((res) => {
      this.events = res;
    });
  }

  sortEventsByDate() {
    this.events.sort((a, b) => (a.startDate > b.startDate) ? 1 : ((b.startDate > a.startDate) ? -1 : 0));
  }

}
