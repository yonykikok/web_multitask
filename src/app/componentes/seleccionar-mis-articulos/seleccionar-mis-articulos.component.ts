import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-seleccionar-mis-articulos',
  templateUrl: './seleccionar-mis-articulos.component.html',
  styleUrls: ['./seleccionar-mis-articulos.component.css']
})
export class SeleccionarMisArticulosComponent implements OnInit {
  myListaDePublicaciones= [];
  listaOferta = [  ];
  precioActual;
  contador=0;
  publicacionObjetivo;

  calcularValorActual(){
    this.precioActual=0;
    this.listaOferta.forEach(element => {
      this.precioActual+=element.precio;
    });
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        this.calcularValorActual();
    }
  }
  constructor(
    private dataBase: DatabaseService,
    private authService:AuthService,
    // private dialogRef: MatDialogRef<SeleccionarMisArticulosComponent>,
    // @Inject(MAT_DIALOG_DATA) data
    
    ) { 
      // this.publicacionObjetivo = data.publicacion;
    }
  
  ngOnInit(): void {
    
    this.authService.buscarUsuarioLogueado();
    this.dataBase.obtenerTodos('publicaciones').subscribe((res)=>{
      res.forEach(response => {        
        const publicacion=response.payload.doc.data();
        if(publicacion['idUserQuePublico']==this.authService.user['id']){
          this.myListaDePublicaciones.push(publicacion);
        }
      });
    });
  }
  ngOnDestroy(){
    this.myListaDePublicaciones=[];
  }

}
