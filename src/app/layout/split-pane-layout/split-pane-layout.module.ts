import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplitPaneLayoutPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [
    SplitPaneLayoutPage,
    EventListComponent,
    EventComponent,
    AthleteListComponent,
    AthleteComponent,
    TeamsComponent,
    ResultComponent
  ]
})
export class SplitPaneLayoutPageModule { }
