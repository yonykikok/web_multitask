import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';
import { GeneradorNotificacionesService } from 'src/app/servicios/generador-notificaciones.service';
import { DetalladoPublicacionComponent } from '../detallado-publicacion/detallado-publicacion.component';


@Component({
  selector: 'app-visualizar-oferta-completa',
  templateUrl: './visualizar-oferta-completa.component.html',
  styleUrls: ['./visualizar-oferta-completa.component.css']
})
export class VisualizarOfertaCompletaComponent implements OnInit {

  publicacionOriginal;


  @Input() listaDeOfertas;
  ampliarOferta = false;
  constructor(public dialog: MatDialog, private dialogRef: MatDialogRef<VisualizarOfertaCompletaComponent>,
    @Inject(MAT_DIALOG_DATA) data, private authService: AuthService, private dataBase: DatabaseService, private genNotificacion: GeneradorNotificacionesService) {
    this.listaDeOfertas = data.listaDeOfertas;
    this.publicacionOriginal = data.publicacionOriginal;
  }

  ngOnInit(): void {
    // console.log(this.listaDeOfertas);
  }
  generarObjetoPermuta(publicacion) {
    let permuta = {
      estadoPermuta: 'pendienteDeConcretacion',
      publicacionOfertada: publicacion,
      idUserQuePublico: publicacion.idUserQuePublico,
    };
    publicacion.listaDeOfertas.forEach(oferta => {
      if (oferta['estadoOferta'] == "aceptadaParaPermutar") {
        permuta['ofertaAceptada'] = oferta;
        permuta['idUserQueOferto'] = oferta['idUserQueOferto'];
        return;
      }
    });

    return permuta;
  }



  aceptarOferta(oferta) {
    this.publicacionOriginal.listaDeOfertas.forEach(auxOferta => {

      if (auxOferta === oferta) {
        auxOferta.estadoOferta = 'aceptadaParaPermutar';
        this.publicacionOriginal.estadoPublicacion = "permutaPendiente";
        this.dataBase.crear('permutas', this.generarObjetoPermuta(this.publicacionOriginal)).then((res) => {
          auxOferta['id'] = res.id;
          this.dataBase.actualizar('publicaciones', this.publicacionOriginal, this.publicacionOriginal.id).then(() => {
            alert("Oferta actualizada con exito");
          }).catch(() => {
            alert("NO SE PUDO ENVIAR LA OFERTA!");
          })
        });
      }
    });
  }




  aceptarORechazarOferta(oferta, estado) {
    this.publicacionOriginal.listaDeOfertas.forEach(auxOferta => {

      if (auxOferta === oferta) {
        auxOferta.estadoOferta = estado;
        if (estado === 'aceptadaParaPermutar') {

          this.publicacionOriginal.estadoPublicacion = "permutaPendiente";
          this.dataBase.crear('permutas', this.generarObjetoPermuta(this.publicacionOriginal)).then((res) => {

            auxOferta['id'] = res.id;
            this.dataBase.actualizar('publicaciones', this.publicacionOriginal, this.publicacionOriginal.id).then(() => {

              this.genNotificacion.crearNotificacionCompraVenta(auxOferta.idUserQueOferto, this.authService.user['id'], "compraventa", "El usuario " + this.authService.user.nombre + " te ha aceptado tu permuta.");

              this.genNotificacion.crearNotificacionCompraVenta(this.authService.user['id'], auxOferta.idUserQueOferto, "compraventa", "Permuta ACEPTADA con éxito. Recuerden comunicarse mediante nuestro chat.");

              alert("Oferta aceptada con exito");

            }).catch(() => {
              alert("NO SE PUDO ENVIAR LA OFERTA!");
            })

          });
        }
        else {


          this.publicacionOriginal.listaDeOfertas = this.listaDeOfertas.filter(x => oferta != x);

          this.dataBase.actualizar('publicaciones', this.publicacionOriginal, this.publicacionOriginal.id).then(() => {

            this.genNotificacion.crearNotificacionCompraVenta(auxOferta.idUserQueOferto, this.authService.user['id'], "compraventa", "El usuario " + this.authService.user.nombre + " te ha rechazado tu permuta.");

            this.genNotificacion.crearNotificacionCompraVenta(this.authService.user['id'], auxOferta.idUserQueOferto, "compraventa", "Permuta RECHAZADA con éxito. Esperamos que las proximas ofertas sean mejores.");

            alert("Oferta rechazada con exito");

          }).catch(() => {
            alert("NO SE PUDO ENVIAR LA OFERTA!");
          })


        }

      }
    });

  }


  openDialog(publicacion) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      publicacion: publicacion,
      esSoloVista: true
    }
    const dialogRef = this.dialog.open(DetalladoPublicacionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
