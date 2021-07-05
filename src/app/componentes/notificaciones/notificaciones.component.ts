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
    private dataBase: DatabaseService) { }

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

        if (this.authService.user['id'] == notificacion.receptor && tipo == notificacion.tipo) {
          listaNotificaciones.push(notificacion);
        }

      })
    })
    listaNotificaciones.sort((fechaUno, fechaDos) => {
      if (fechaUno < fechaDos) { return -1; }

      if (fechaUno > fechaDos) { return 1; }

      return 0;
    });
    return listaNotificaciones;
  }




  eliminarNotificacion(notificacionParametro) {
    console.log(notificacionParametro);

    if (confirm("¿Esta seguro que quiere eliminar esta notificación?")) {
      let id: string;
      this.dataBase.obtenerTodos("notificaciones").subscribe((auxNotificaciones) => {
        auxNotificaciones.forEach((response: any) => {
          let idAEliminar = response.payload.doc.id;
          if (idAEliminar == notificacionParametro) {
            console.log(idAEliminar + "---" + notificacionParametro)
            this.dataBase.eliminar("notificaciones", idAEliminar).then(res => {


              this.listadoNotificacionesSistema = this.listadoNotificacionesSistema.filter(notificacion => {
                if (notificacion.id != idAEliminar) return notificacion;
              })


            }).catch(err => {

              console.log("ERROR!", err);
            })
            // this.listadoNotificaciones = this.cargarNotificacionesNoVistas();
          }
        })
      });
    }

  }





}
