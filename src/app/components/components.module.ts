import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { AuthHeaderComponent } from './auth-header/auth-header.component';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TranslateModule
  ],
  declarations: [
    HeaderComponent,
    AuthHeaderComponent
  ],
  exports: [
    HeaderComponent,
    AuthHeaderComponent
  ]
})
export class ComponentsModule { }
