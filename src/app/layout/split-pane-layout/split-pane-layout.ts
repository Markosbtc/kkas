import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-split-pane-layout',
  templateUrl: './split-pane-layout.html',
  styleUrls: ['./split-pane-layout.scss'],
})
export class SplitPaneLayoutPage implements OnInit {
  public appPages = [
    { title: 'home.HOMEPAGE', url: '/home', icon: 'home' },
    { title: 'home.EVENTS', url: '/events', icon: 'play' },
    { title: 'home.COMPETITORS', url: '/athletes', icon: 'people' },
    { title: 'home.TEAMS', url: '/teams', icon: 'bookmarks' },
  ];
  public adminPages = [
    { title: 'home.MYTEAM', url: '/admin/teams', icon: 'bookmarks' },
    { title: 'home.COMPETITORS', url: '/admin/athletes', icon: 'people' },
    { title: 'home.EVENTS', url: '/admin/events', icon: 'play' },
    { title: 'admin.result', url: '/admin/results', icon: 'accessibility' },
  ];

  isAdmin: boolean = true; //TODO: get role of user

  constructor() { }

  ngOnInit() {
  }

}
