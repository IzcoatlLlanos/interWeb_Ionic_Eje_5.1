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
        horaInicio       : '16:00',
        horaFin          : '23:00',
        nombreCliente    : 'Hector Izcoatl Llanos Godoy',
        celularCliente   : '3112356094',
        tipoEvento       : 'Cumpleaños',
        nota             : '',
        llenadoAgua      : 65,
        mesaRegalos      : true,
        cantPersonas     : 150,
        brincolin        : ['',''],
        mantelColor      : ['rojo','azul'],
        precioTotal      : 2500,
        aCuenta          : 1200,
        resto            : 1300,
        metodoPago       : ['Anticipo Efectivo', 'Resto transferencia'],
        estatus          : 'Pagado',
        activo           : true,
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

  public deleteEvento(pos: number) {
    this.eventos.splice(pos,1);
  }
}
