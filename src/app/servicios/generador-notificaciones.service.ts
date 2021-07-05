import { Injectable } from '@angular/core';

// SERVICIO DATABASE.
import { DatabaseService } from "../servicios/database.service";
// ANGULAR FIRESTORE.
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GeneradorNotificacionesService {

  constructor(private dataBase: DatabaseService, private firestore: AngularFirestore,) { }


  public crearNotificacion(receptor: any, emisor: any, tipo: any, mensaje: any) {

    let notificacionJSON = {
      receptor: receptor,
      emisor: emisor,
      tipo: tipo,
      mensaje: mensaje,
      fecha: new Date().toLocaleDateString("en-GB"),
    };

    return this.firestore.collection("notificaciones").add(notificacionJSON);
  }


  public crearNotificacionCompraVenta(idReceptor: any, idEmisor: any, tipo: any, mensaje: any) {
    let emisor;

    let notificacionJSON = {
      receptor: idReceptor,
      emisor: emisor,
      tipo: tipo,
      mensaje: mensaje,
      fecha: new Date().toLocaleDateString("en-GB"),
      foto: "https://i.imgur.com/jAehbWl.png"
    };

    if (idEmisor != "sistema") {
      this.dataBase.obtenerPorId("usuarios", idEmisor).subscribe((res) => {
        if (res) {
          emisor = res.payload.data();
          notificacionJSON.foto = emisor.foto;
        }
      });
    }
  }

}
