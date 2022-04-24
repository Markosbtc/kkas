import { NgModule } from '@angular/core';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes, RouterModule } from '@angular/router';
import { AdminAthletesFormComponent } from 'src/app/admin/admin-athletes-form/admin-athletes-form.component';
import { AdminAthletesComponent } from 'src/app/admin/admin-athletes/admin-athletes.component';
import { AdminEventFormComponent } from 'src/app/admin/admin-event-form/admin-event-form.component';
import { AdminEventComponent } from 'src/app/admin/admin-event/admin-event.component';
import { AdminTeamsFormComponent } from 'src/app/admin/admin-teams-form/admin-teams-form.component';
import { AdminTeamsComponent } from 'src/app/admin/admin-teams/admin-teams.component';
import { RefereeComponent } from 'src/app/admin/referee/referee.component';
import { AthleteListComponent } from 'src/app/athletes/athlete-list/athlete-list.component';
import { AthleteComponent } from 'src/app/athletes/athlete/athlete.component';
import { EventListComponent } from 'src/app/events/event-list/event-list.component';
import { EventComponent } from 'src/app/events/event/event.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { TeamsComponent } from 'src/app/teams/teams.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  // TODO: AuthGuard where needed
  { path: 'home',                 loadChildren: () => import('../../home/home.module').then(m => m.HomeModule)                        },
  { path: 'events',               component: EventListComponent                                                                       },
  { path: 'event/:id',            component: EventComponent                                                                           },
  { path: 'athletes',             component: AthleteListComponent                                                                     },
  { path: 'athlete/:id',          component: AthleteComponent                                                                         },
  { path: 'teams',                component: TeamsComponent                                                                           },
  { path: 'admin/teams',          component: AdminTeamsComponent,          ...canActivate(redirectUnauthorizedToLogin)/* role: user*/ },
  { path: 'admin/team',           component: AdminTeamsFormComponent,      ...canActivate(redirectUnauthorizedToLogin)/* role: user*/ },
  { path: 'admin/athletes',       component: AdminAthletesComponent,       ...canActivate(redirectUnauthorizedToLogin)/* role: user*/ },
  { path: 'admin/athlete',        component: AdminAthletesFormComponent,   ...canActivate(redirectUnauthorizedToLogin)/* role: user*/ },
  { path: 'admin/events',         component: AdminEventComponent,          ...canActivate(redirectUnauthorizedToLogin)/* role: user*/ },
  { path: 'admin/event',          component: AdminEventFormComponent,      ...canActivate(redirectUnauthorizedToLogin)/* role: user*/ },
  { path: 'admin/results',        component: RefereeComponent,             ...canActivate(redirectUnauthorizedToLogin)/* role: user*/ }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplitPaneLayoutPageRoutingModule { }
