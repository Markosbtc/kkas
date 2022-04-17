import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplitPaneLayoutPageRoutingModule } from './split-pane-layout-routing.module';

import { SplitPaneLayoutPage } from './split-pane-layout';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { EventListComponent } from 'src/app/events/event-list/event-list.component';
import { EventComponent } from 'src/app/events/event/event.component';
import { AthleteListComponent } from 'src/app/athletes/athlete-list/athlete-list.component';
import { AthleteComponent } from 'src/app/athletes/athlete/athlete.component';
import { TeamsComponent } from 'src/app/teams/teams.component';
import { ResultComponent } from 'src/app/events/result/result.component';
import { AdminTeamsComponent } from 'src/app/admin/admin-teams/admin-teams.component';
import { AdminAthletesComponent } from 'src/app/admin/admin-athletes/admin-athletes.component';
import { AdminAthletesFormComponent } from 'src/app/admin/admin-athletes-form/admin-athletes-form.component';
import { AdminTeamsFormComponent } from 'src/app/admin/admin-teams-form/admin-teams-form.component';
import { RefereeComponent } from 'src/app/admin/referee/referee.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplitPaneLayoutPageRoutingModule,
    ComponentsModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [
    SplitPaneLayoutPage,
    EventListComponent,
    EventComponent,
    AthleteListComponent,
    AthleteComponent,
    TeamsComponent,
    ResultComponent,
    AdminTeamsComponent,
    AdminTeamsFormComponent,
    AdminAthletesComponent,
    AdminAthletesFormComponent,
    RefereeComponent
  ]
})
export class SplitPaneLayoutPageModule { }
