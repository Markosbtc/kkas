import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    IonicModule,
    HomeRoutingModule,
    TranslateModule,
    ComponentsModule
  ]
})
export class HomeModule { }
