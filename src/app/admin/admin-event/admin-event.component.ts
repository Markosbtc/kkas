import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/shared/models/event';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-admin-event',
  templateUrl: './admin-event.component.html',
  styleUrls: ['./admin-event.component.scss'],
})
export class AdminEventComponent implements OnInit {
  events: Event[] = [];

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getUserProfile().subscribe((res) => {
      if (res) {    
        this.eventService.getEventsByTeamId(res.team.id).subscribe((r) => {          
          this.events = r;
        });
      }
    });
  }

  registerEvent() {
    this.router.navigate(['/admin/event']);
  }

}
