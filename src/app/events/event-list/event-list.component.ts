import { Component, OnInit } from '@angular/core';
import { Event, EventCategory } from 'src/app/shared/models/event';
import { EventService } from 'src/app/shared/services/event.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  eventCategoryTypes = EventCategory.EVENTS;

  // filters:
  eventName: string;
  eventPlace: string;
  eventYear; //TODO: type? Date/string/number?
  eventType: string;
  filters = {}


  constructor(
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.eventService.getEvents().subscribe((res) => {
      this.events = res;
      this.sortEventsByDate();
      this.applyFilters();
    });
  }

  sortEventsByDate() {
    this.events.sort((a, b) => (a.startDate > b.startDate) ? 1 : ((b.startDate > a.startDate) ? -1 : 0));
  }

  applyFilters() {
    this.filteredEvents = _.filter(this.events, _.conforms(this.filters));
  }

  removeFilter(property: string) {
    delete this.filters[property];
    this[property] = null;
    this.applyFilters();
  }

  filterIncludes(property: string, rule: any) {
    this.filters[property] = val => _.toLower(val).includes(_.toLower(rule));
    this.applyFilters();
  }

  filterExact(property: string, rule: any) {
    this.filters[property] = val => _.toLower(val) == _.toLower(rule);
    this.applyFilters();
  }

  eventTypeSelectChange(event: any) {
    if (event.detail.value) {
      this.filterExact('eventCategory', this.eventType);
    } else {
      this.removeFilter('eventCategory');
    }
  }

}
