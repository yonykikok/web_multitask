import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetalladoPublicacionComponent } from 'src/app/componentes/detallado-publicacion/detallado-publicacion.component';
import { VisualizarOfertaCompletaComponent } from 'src/app/componentes/visualizar-oferta-completa/visualizar-oferta-completa.component';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';
import { GeneradorNotificacionesService } from 'src/app/servicios/generador-notificaciones.service';

@Component({
  selector: 'app-publicaciones-cliente',
  templateUrl: './publicaciones-cliente.component.html',
  styleUrls: ['./publicaciones-cliente.component.css']
})
export class PublicacionesClienteComponent implements OnInit {
  @Input() tituloSector;
  @Input() criterioDeFiltrado;
  mostrarPendientes = false;
  cantidadDeOfertas;
  misPublicaciones = [];
  displayedColumns: string[] = ['titulo', 'precio', 'descripcion', 'accion'];

  constructor(private firestore: AngularFirestore,
    private dataBase: DatabaseService, public dialog: MatDialog,
    private authService: AuthService,

    private genNotificacion: GeneradorNotificacionesService,
  ) { }

  ngOnInit(): void {
    this.misPublicaciones = this.obtenerMisPublicaciones();
    setTimeout(() => {

      this.misPublicaciones.forEach(element => {
        console.log(element.titulo + ": ", element.listaDeOfertas);
      });
    }, 1000);

  }


  obtenerMisPublicaciones(): any {
    let auxiliar = [];
    let publicacion;
    this.misPublicaciones = [];
    this.firestore.collection("publicaciones").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        publicacion = doc.data();

        if (this.authService.user['id'] == publicacion.idUserQuePublico) {
          auxiliar.push(publicacion);
        }
      })
      this.misPublicaciones = auxiliar.filter(row => row.estadoPublicacion === this.criterioDeFiltrado); // returns array with only estadoPublicacion === {{criterioDeFiltrado}}


    })
    return this.misPublicaciones;
  }
  cancelarPermuta(publicacion) {
    console.log(publicacion);
    publicacion.listaDeOfertas.forEach(oferta => {

      if (oferta.estadoOferta === "aceptadaParaPermutar") {
        oferta.estadoOferta = 'pendiente';
        publicacion.estadoPublicacion = "aceptado";
        this.dataBase.actualizar('publicaciones', publicacion, publicacion.id).then(() => {
          this.dataBase.eliminar('permutas', oferta.id);
          this.misPublicaciones = this.obtenerMisPublicaciones();
          this.genNotificacion.crearNotificacion(this.authService.user['id'], "sistema", "sistema", "Has cancelado la permuta por la publicación" + publicacion.titulo);

        }).catch(() => {
          alert("NO SE PUDO CANCELAR LA OFERTA!");
        })
        return;
      }
    });

  }

  openDialog(publicacion) {
    console.log(publicacion.listaDeOfertas);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      listaDeOfertas: publicacion.listaDeOfertas,
      publicacionOriginal: publicacion
    }
    const dialogRef = this.dialog.open(VisualizarOfertaCompletaComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

      if (result != null && (result == 'aceptado' || result == 'rechazado')) {
        // this.cambiarEstadoDepublicacion(publicacion,result);
      }
      else {
        // alert("estoy");
      }
    });
  }

  cambiarEstadoDepublicacion(publicacion, estado) {
    // publicacion.estadoPublicacion=estado;
    // this.dataBase.actualizar('publicaciones',publicacion,publicacion.id);
    // this.misPublicaciones=this.obtenerMisPublicaciones();

  }

  pausar(publicacion, pausa) {
    let estado = "";
    if (pausa) {
      estado = 'pausado'
    } else {
      estado = 'aceptado'
    }

    this.genNotificacion.crearNotificacion(this.authService.user['id'], "sistema", "sistema", "Ha modificado el estado de la publicación: " + publicacion.titulo);

    publicacion.estadoPublicacion = estado;
    this.dataBase.actualizar('publicaciones', publicacion, publicacion.id);
    this.misPublicaciones = this.obtenerMisPublicaciones();
  }


}
