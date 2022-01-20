import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplitPaneLayoutPageRoutingModule } from './split-pane-layout-routing.module';

import { SplitPaneLayoutPage } from './split-pane-layout';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplitPaneLayoutPageRoutingModule,
    TranslateModule
  ],
  declarations: [SplitPaneLayoutPage]
})
export class SplitPaneLayoutPageModule { }
