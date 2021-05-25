import { Injectable } from '@angular/core';

// SERVICIO DATABASE.
import { DatabaseService } from "../servicios/database.service";
// ANGULAR FIRESTORE.
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GeneradorNotificacionesService {

  constructor(private dataBase: DatabaseService, private firestore : AngularFirestore,) { }


  public crearNotificacion(receptor : any, emisor : any, tipo : any, mensaje : any) {

    let notificacionJSON = {
      receptor:receptor,
      emisor: emisor,
      tipo: tipo,
      mensaje : mensaje,
      fecha: new Date().toLocaleDateString(),
    };

    return this.firestore.collection("notificaciones").add(notificacionJSON);
  }






}
