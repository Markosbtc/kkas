import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AthleteListComponent } from 'src/app/athletes/athlete-list/athlete-list.component';
import { AthleteComponent } from 'src/app/athletes/athlete/athlete.component';
import { EventListComponent } from 'src/app/events/event-list/event-list.component';
import { EventComponent } from 'src/app/events/event/event.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { TeamsComponent } from 'src/app/teams/teams.component';

const routes: Routes = [
  // TODO: AuthGuard where needed
  {
    path: 'home',
    loadChildren: () => import('../../home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'events',
    component: EventListComponent
  },
  {
    path: 'event/:id',
    component: EventComponent
  },
  {
    path: 'athletes',
    component: AthleteListComponent
  },
  {
    path: 'athlete/:id',
    component: AthleteComponent
  },
  {
    path: 'teams',
    component: TeamsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplitPaneLayoutPageRoutingModule { }
