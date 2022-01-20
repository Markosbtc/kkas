import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplitPaneLayoutPageRoutingModule } from './split-pane-layout-routing.module';

import { SplitPaneLayoutPage } from './split-pane-layout';
import { TranslateModule } from '@ngx-translate/core';
import { EventsComponent } from 'src/app/events/events.component';
import { ComponentsModule } from 'src/app/components/components.module';

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
    EventsComponent
  ]
})
export class SplitPaneLayoutPageModule { }
