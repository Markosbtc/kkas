import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-split-pane-layout',
  templateUrl: './split-pane-layout.html',
  styleUrls: ['./split-pane-layout.scss'],
})
export class SplitPaneLayoutPage implements OnInit {
  public appPages = [
    { title: 'home.HOMEPAGE', url: '/home', icon: 'home' },
    { title: 'home.EVENTS', url: '/events', icon: 'play' },
    { title: 'home.COMPETITORS', url: '/folder/Favorites', icon: 'people' },
    { title: 'home.TEAMS', url: '/folder/Archived', icon: 'bookmarks' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor() { }

  ngOnInit() {
  }

}
