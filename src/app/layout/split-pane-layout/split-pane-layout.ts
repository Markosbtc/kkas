import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-split-pane-layout',
  templateUrl: './split-pane-layout.html',
  styleUrls: ['./split-pane-layout.scss'],
})
export class SplitPaneLayoutPage implements OnInit {
  public appPages = [
    { title: 'HOMEPAGE', url: '/home', icon: 'home' },
    { title: 'EVENTS', url: '/events', icon: 'play' },
    { title: 'COMPETITORS', url: '/folder/Favorites', icon: 'people' },
    { title: 'TEAMS', url: '/folder/Archived', icon: 'bookmarks' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor() { }

  ngOnInit() {
  }

}
