import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoCompartidaService {


  static imagenesSeleccionadas=false;   
  static imagenesSeleccionadas$ = new Subject<boolean>();


 static obtenerSiHayImagenesSeleccionadas$(): Observable<boolean> {
    return this.imagenesSeleccionadas$.asObservable();
  }
   static hayImagenesSeleccionadas(booleano) {
    this.imagenesSeleccionadas$.next(booleano);
  }
  
  constructor() { }
}
