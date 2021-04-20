import { Component, Input, OnInit,EventEmitter, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetalladoPublicacionComponent } from 'src/app/componentes/detallado-publicacion/detallado-publicacion.component';
import { VisualizarOfertaCompletaComponent } from 'src/app/componentes/visualizar-oferta-completa/visualizar-oferta-completa.component';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';
@Component({
  selector: 'app-publicaciones-cliente',
  templateUrl: './publicaciones-cliente.component.html',
  styleUrls: ['./publicaciones-cliente.component.css']
})
export class PublicacionesClienteComponent implements OnInit {
  @Input() tituloSector;
  @Input() criterioDeFiltrado;
  mostrarPendientes=false;
  cantidadDeOfertas;
  misPublicaciones = [];
  displayedColumns: string[] = ['titulo', 'precio', 'descripcion','accion'];

  constructor(private firestore: AngularFirestore,
    private dataBase: DatabaseService, public dialog: MatDialog,
    private authService:AuthService) { }

   ngOnInit(): void {    
    this.misPublicaciones=this.obtenerMisPublicaciones();

  }


  obtenerMisPublicaciones(): any {


    let auxiliar=[];
    let publicacion;
    this.misPublicaciones = [];
    this.firestore.collection("publicaciones").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        publicacion=doc.data();      

        if(this.authService.user['id']==publicacion.idUserQuePublico){
          auxiliar.push(publicacion);
        }
      })
      this.misPublicaciones = auxiliar.filter(row => row.estadoPublicacion === this.criterioDeFiltrado); // returns array with only estadoPublicacion === {{criterioDeFiltrado}}
   

    })
     return this.misPublicaciones;
  }


  openDialog(publicacion) {
    console.log(publicacion.listaDeOfertas);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      listaDeOfertas:publicacion.listaDeOfertas,
      publicacionOriginal:publicacion
    }
    const dialogRef = this.dialog.open(VisualizarOfertaCompletaComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

      if(result!=null && (result=='aceptado'|| result=='rechazado')){
        // this.cambiarEstadoDepublicacion(publicacion,result);
      }
      else{
        // alert("estoy");
      }
    });
  }

  cambiarEstadoDepublicacion(publicacion,estado){
    // publicacion.estadoPublicacion=estado;
    // this.dataBase.actualizar('publicaciones',publicacion,publicacion.id);
    // this.misPublicaciones=this.obtenerMisPublicaciones();
    
  }

}
