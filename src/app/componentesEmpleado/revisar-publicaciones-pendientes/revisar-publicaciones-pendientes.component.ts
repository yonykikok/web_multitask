import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetalladoPublicacionComponent } from 'src/app/componentes/detallado-publicacion/detallado-publicacion.component';
import { LoginComponent } from 'src/app/componentes/login/login.component';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-revisar-publicaciones-pendientes',
  templateUrl: './revisar-publicaciones-pendientes.component.html',
  styleUrls: ['./revisar-publicaciones-pendientes.component.css']
})
export class RevisarPublicacionesPendientesComponent implements OnInit {
  listaDePublicacionesPendientes: any[] = [];
  displayedColumns: string[] = ['titulo', 'precio', 'descripcion','accion'];

  constructor(private firestore: AngularFirestore,
    private dataBase: DatabaseService, public dialog: MatDialog) { }

   ngOnInit(): void {
    this.listaDePublicacionesPendientes=this.obtenerPublicacionesPendientes();
  }

  obtenerPublicacionesPendientes(): any {
    let publicacion;
    let publicacionesPendientes = [];//var
    this.firestore.collection("publicaciones").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        publicacion=doc.data();
        if(publicacion.estadoPublicacion=='pendiente'){
          publicacion['id']=doc.id;
          publicacionesPendientes.push(publicacion);
        }
      })
      console.log(publicacionesPendientes);
    })
    return publicacionesPendientes;
  }


  openDialog(publicacion) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      publicacion:publicacion
    }
    const dialogRef = this.dialog.open(DetalladoPublicacionComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

      if(result!=null && (result=='aceptado'|| result=='rechazado')){
        this.cambiarEstadoDepublicacion(publicacion,result);
      }
      else{
        alert("estoy");
      }
    });
  }

  cambiarEstadoDepublicacion(publicacion,estado){
    publicacion.estadoPublicacion=estado;
    this.dataBase.actualizar('publicaciones',publicacion,publicacion.id);
    this.listaDePublicacionesPendientes=this.obtenerPublicacionesPendientes();
    
  }
  abrirDetalladoPublicacion(element){
    console.log(element);
  }
}
