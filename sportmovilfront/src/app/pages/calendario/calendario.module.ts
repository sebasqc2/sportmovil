import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CalendarioPage } from './calendario.page';
import { CalendarioPageRoutingModule } from './calendario-routing.module';
import { NgCalendarModule  } from 'ionic2-calendar';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { HttpClientModule } from '@angular/common/http';


registerLocaleData(localeDe);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioPageRoutingModule,
    NgCalendarModule,
    HttpClientModule
  ],
  declarations: [CalendarioPage],
  providers: [
    { provide: LOCALE_ID, useValue: "en-US" }
  ]
})
export class CalendarioPageModule {}
