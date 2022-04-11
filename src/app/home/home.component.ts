import { Component, OnInit } from '@angular/core';
import { Event } from '../shared/models/event';
import { EventService } from '../shared/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentEvents: Event[] = [];
  upcomingEvents: Event[] = [];

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit() {
    /* TODO: fix this method
    this.eventService.getCurrentEvent().subscribe((res) => {
      this.currentEvent = res[0];
    }); */

    this.eventService.getUpcomingEvents().subscribe((resp) => {
      this.upcomingEvents = resp;
      resp.forEach((event: Event) => {
        if ((event.startDate <= (new Date().toISOString())) && event.endDate >= (new Date().toISOString())) {
          this.currentEvents.push(event);
        }
      });
    });
  }

}
