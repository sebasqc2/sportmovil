import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CrudServiceService } from '../../shared/services/crud-service.service';
import { Actividad } from '../../shared/model/Actividad';
import * as moment from 'moment';
moment().format();
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit{
  model: Array<Actividad>;
  eventSource = [];
  viewTitle: string;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  selectedDate: Date;
  selectedObject;
  selectedDay;
  isToday: boolean;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  constructor(
    private crudServices: CrudServiceService,
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    private modalCtrl: ModalController) {}

  ngOnInit(): void {
    this.getDatosActividades();
  }

  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    // tslint:disable-next-line: prefer-const
    let start = formatDate(event.startTime, 'medium', this.locale);
    // tslint:disable-next-line: prefer-const
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      // tslint:disable-next-line: max-line-length
      message: 'Lugar: ' + event.lugar + '<br><br>Obs: ' + event.observaciones + '<br><br>Hora: ' +
      event.startTime.getHours() + ':' + event.startTime.getMinutes() + ' - ' + event.endTime.getHours() + ':' +
      event.startTime.getMinutes(),
      buttons: ['OK'],
    });
    alert.present();
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
    // console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
    //   (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.selectedObject = ev;
    // this.openActionSheet(ev)
  }
  onCurrentDateChanged(event: Date) {
    // tslint:disable-next-line: prefer-const
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();

    this.selectedDay = event;

  }

   async crearEventosDeActividades(){
    // tslint:disable-next-line: prefer-const
    let events = [];
    this.model.forEach(element => {
      // tslint:disable-next-line: prefer-const
      let fechaI = new Date(element.FECHA);
      let hora = element.HORA.split( ":");
      // tslint:disable-next-line: radix
      fechaI.setHours(parseInt(hora[0]));
      // tslint:disable-next-line: radix
      fechaI.setMinutes(parseInt( hora[1] ));
      // tslint:disable-next-line: radix
      fechaI.setSeconds(parseInt( hora[2].substring(0, 2)));

      let fechaF = new Date(fechaI);
      let hasta: number = fechaI.getHours();
      fechaF.setHours((hasta + element.DURACION));
      events.push({
        title: element.NOMBRE,
        observaciones: element.OBSERVACIONES,
        lugar: element.lugare.NOMBRE_LUGAR,
        startTime: fechaI,
        endTime: fechaF
      });
    });
    this.eventSource = events;
  }

  createRandomEvents() {
    let events = [];
    for (var i = 0; i < 50; i += 1) {
      let date = new Date();
      let startDay = Math.floor(Math.random() * 90) - 45;
      let endDay = Math.floor(Math.random() * 2) + startDay;
      let startTime;
      let endTime;
      
      let startMinute = Math.floor(Math.random() * 24 * 60);
      let endMinute = Math.floor(Math.random() * 180) + startMinute;
      startTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + startDay,
          0,
          date.getMinutes() + startMinute
        );
      endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + endDay,
          0,
          date.getMinutes() + endMinute
        );
      events.push({
          title: 'Event - ' + i,
          observaciones: 'obser' + i,
          lugar: 'lugar ' + i,
          startTime: startTime,
          endTime: endTime,
        });
      // }
    }
    this.eventSource = events;
  }

  removeEvents() {
    this.eventSource = [];
  }

  getDatosActividades(): void{
     this.getActividades(`actividades/alumnos/1`);
  }

  getActividades(ruta: string): void {
    this.crudServices.getModel(ruta).subscribe(
      data => {
        if (JSON.stringify(data) !== '[]') {
          this.model = data;
          this.crearEventosDeActividades();
        }
      });
  }

}
