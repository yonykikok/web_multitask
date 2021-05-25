import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  constructor(private firestore: AngularFirestore, 
    private authService: AuthService,
    private dataBase : DatabaseService) { }

  listadoNotificacionesCompraVenta = [];
  listadoNotificacionesSistema = [];
  mostrar;


  ngOnInit(): void {

    this.listadoNotificacionesCompraVenta = this.cargarNotificacionesNoVistas("compraventa");
    this.listadoNotificacionesSistema = this.cargarNotificacionesNoVistas("sistema");
    this.mostrar = "";
  }


  cargarNotificacionesNoVistas(tipo): any {
    let notificacion;
    var listaNotificaciones = [];
    this.firestore.collection("notificaciones").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {

        notificacion = doc.data();

        notificacion['id'] = doc.id;

        if (this.authService.user['id'] == notificacion.receptor && tipo == notificacion.tipo) 
        {
          listaNotificaciones.push(notificacion);
        }

      })
    })
    return listaNotificaciones;
  }



  eliminarNotificacion(notificacionParametro) {
    alert("no me toques porque no hago nada, me rompi");
    /*
    if (confirm("¿Esta seguro que quiere eliminar esta notificación?")) {
      let id: string;
      this.dataBase.obtenerTodos("notificaciones").subscribe((auxNotificaciones) => {
        auxNotificaciones.forEach((response: any) => {
          let notiInfo = response.payload.doc.data();
          if (notiInfo.id == notificacionParametro.id) {
            id = response.payload.doc.id;
            this.dataBase.eliminar("notificaciones", id);
            this.listadoNotificaciones = this.cargarNotificacionesNoVistas();
          }
        })
      });
    }
    */
  }





}
