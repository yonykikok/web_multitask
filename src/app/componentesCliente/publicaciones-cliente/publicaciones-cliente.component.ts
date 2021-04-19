import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetalladoPublicacionComponent } from 'src/app/componentes/detallado-publicacion/detallado-publicacion.component';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';
@Component({
  selector: 'app-publicaciones-cliente',
  templateUrl: './publicaciones-cliente.component.html',
  styleUrls: ['./publicaciones-cliente.component.css']
})
export class PublicacionesClienteComponent implements OnInit {
  misPublicaciones = [];
  displayedColumns: string[] = ['titulo', 'precio', 'descripcion','accion'];

  constructor(private firestore: AngularFirestore,
    private dataBase: DatabaseService, public dialog: MatDialog,
    private authService:AuthService) { }

   ngOnInit(): void {    
    this.misPublicaciones=this.obtenerMisPublicaciones();
  }

  obtenerMisPublicaciones(): any {
    let publicacion;
     this.misPublicaciones = [];
    this.firestore.collection("publicaciones").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        publicacion=doc.data();        
        if(this.authService.user['id']==publicacion.idUserQuePublico){
          if(publicacion.listaDeOfertas)
          console.log(publicacion.listaDeOfertas.length);
          this.misPublicaciones.push(publicacion);
        }
      })
    })
     return this.misPublicaciones;
  }


  openDialog(publicacion) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      publicacion:publicacion
    }
    const dialogRef = this.dialog.open(DetalladoPublicacionComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

      if(result!=null && (result=='aceptado'|| result=='rechazado')){
        // this.cambiarEstadoDepublicacion(publicacion,result);
      }
      else{
        alert("estoy");
      }
    });
  }

  cambiarEstadoDepublicacion(publicacion,estado){
    // publicacion.estadoPublicacion=estado;
    // this.dataBase.actualizar('publicaciones',publicacion,publicacion.id);
    // this.misPublicaciones=this.obtenerMisPublicaciones();
    
  }

}
