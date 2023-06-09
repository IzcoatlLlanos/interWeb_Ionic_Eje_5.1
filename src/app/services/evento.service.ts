import { Injectable } from '@angular/core';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private eventos: Evento[] = [];
  constructor() {
    this.eventos = [
      {
        fecha            : '2023-06-23',
        horaInicio       : '16',
        horaFin          : '23',
        nombreCliente    : 'Filomeno',
        celularCliente   : '3112356094',
        tipoEvento       : 'Cumpleaños',
        nota             : 'Reservación de filomeno',
        llenadoAgua      : 65,
        mesaRegalos      : 'si',
        cantPersonas     : 90,
        brincolin        : 'no',
        mantelColor      : ['ROJO','AZUL'],
        precioTotal      : 2500,
        aCuenta          : 1200,
        resto            : 1300,
        metodoPago       : ['EFECTIVO'],
        estatus          : 'Pagado',
        activo           : 'si',
      }
    ]
  }

  public getEveto(fechaEvento: string): Evento|undefined {
    return this.eventos.find( evt => {return  evt.fecha == fechaEvento});
  }
  public getEventos(): Evento[] {
    return this.eventos;
  }

  public addEvento(evt: Evento) {
    this.eventos.push(evt);
  }

  public updateEvento(evt: Evento, pos: number) {
    this.eventos[pos] = evt;
  }

  findEventoIndex(fecha: string): number {
    return this.eventos.findIndex( evt => {return  evt.fecha == fecha});
  }

  public deleteEvento(pos: number) {
    this.eventos.splice(pos,1);
  }
}
