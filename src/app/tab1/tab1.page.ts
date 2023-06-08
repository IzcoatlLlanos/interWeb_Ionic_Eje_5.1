import { Component, OnDestroy, ViewChild } from '@angular/core';
import { IonicModule, IonDatetime } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Evento } from '../models/evento';
import { EventoService } from '../services/evento.service';
import {AlertController,IonSearchbar,IonSelect,ModalController,ToastController,} from '@ionic/angular'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ExploreContainerComponent],
})

export class Tab1Page {
  @ViewChild('calendar', { static: false }) calendar!: IonDatetime;

  private eventoColores = {
    'XV años': { backgroundColor: '#428cff', textColor: '#fff' },
    Boda: { backgroundColor: '#2fdf75', textColor: '#000' },
    Cumpleaños: { backgroundColor: '#ffd534', textColor: '#000' },
  };

  reservacionEvento: colorEvt[] = [];

  eventoSeleccionado?: Evento;
   eventos    : Evento[] = [];
   isModalOpen = false;
   disponible  = -1;
   openOp      = 0;
   fechaSel    = '';
   
  constructor(
    private evtService: EventoService,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController,) {
    
    this. eventos = this.evtService.getEventos();
    console.log(this.eventos);
    this.eventos.forEach((evento) => this.marcarFecha(evento.fecha, evento.tipoEvento));
    
    
  }

  private marcarFecha(fecha: string, tipo: string) {
    const color =
      tipo === 'XV años'
        ? this.eventoColores['XV años']
        : tipo === 'Boda'
        ? this.eventoColores['Boda']
        : this.eventoColores['Cumpleaños'];
    this.reservacionEvento.push({ date: fecha, ...color });
  }

  setOpen(isOpen: boolean, op: number) {
    if (!isOpen) {
      this.confirmationDialog('¿Estas seguro de cancelar la operación?, perderás los datos capturados.',
      () => {
        this.isModalOpen = isOpen;
    });
    }
    else if (isOpen) this.isModalOpen = isOpen;
    this.openOp = op;
    //0 Nada
    //1 Modificar
    //2 Insertar
  }

  onDateChange(event: any) {

    const date = event.detail.value[0];
    const dia = parseInt(date.substring(8,10));
    console.log(dia);
    this.fechaSel = date;
    const foundItem = this.eventos.find(evt => evt.fecha === date);
    
    if (dia>=8) {
      if (foundItem) { 
        this.presentToast('Fecha Ocupada','danger');
        this.eventoSeleccionado = this.evtService.getEveto(date);
        this.disponible = 0;
      }
      else { 
        this.presentToast('Fecha Disponible','success');
        this.disponible = 1;
      }
    }else {
      this.disponible = 2;
    }
    this.calendar.reset();
    
  }
  private async confirmationDialog(
    header: string,
    handler?: Function,
    dismissFunction?: Function
  ) {
    const alert = await this.alertController.create({
      header,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.presentToast('Operación cancelada', 'warning');
          },
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          cssClass: 'primary',
          handler: () => {
            if (handler) handler();
            this.presentToast('Operación realizada', 'success');
          },
        },
      ],
    });
    alert.present();
    alert.onDidDismiss().then((respuesta) => {
      if (dismissFunction) dismissFunction(respuesta);
    });
  }

  private async presentToast(
    message: string,
    color: 'success' | 'danger' | 'warning'
  ) {
    const toast = await this.toastController.create({
      message,
      duration: 500,
      color,
    });
    toast.present();
  }
  
}

interface colorEvt {
  date: string;
  backgroundColor: string;
  textColor: string;
}