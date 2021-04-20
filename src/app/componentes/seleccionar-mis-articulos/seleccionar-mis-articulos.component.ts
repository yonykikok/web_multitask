import { Component, Inject, Input, OnInit, EventEmitter, Output } from '@angular/core';
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
  @Input() publicacionObjetivo;
   myListaDePublicaciones= [];
  listaOferta = [];
  precioActual=0;
  contador=0;
  @Output() cancelarEvent:EventEmitter<any>=new EventEmitter<any>();
  // @Output() enviarOfertaEvent:EventEmitter<any>=new EventEmitter<any>();

  calcularValorActual(){
    let retorno=0;
    this.listaOferta.forEach(element => {
      retorno+= element.precio;
      console.log("calculando "+retorno);

    });
    return retorno;
  }
  drop(event: CdkDragDrop<string[]>) {
    let valorActual=0;
    if(event.previousContainer.id[event.previousContainer.id.length-1]=="0"){//mueve de disponible a ofrecer
      valorActual =this.calcularValorActual()+event.previousContainer.data[event.previousIndex]['precio'];
    // console.log(event.previousContainer.id[event.previousContainer.id.length-1]);
    console.log("SUMA");
    }else{//de ofrecer vuevle a disponible
    console.log("RESTA");
    valorActual =this.calcularValorActual()-event.previousContainer.data[event.previousIndex]['precio'];
    }

    console.log(valorActual);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if(valorActual<=this.publicacionObjetivo.precio){
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
          this.precioActual=this.calcularValorActual();
        }
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
    
    
    enviarEvento(evento){
      let listaOfertasExistentes=[];
      switch(evento)
      {
        case 'cancelar':
          this.cancelarEvent.emit();
          break;
        case 'enviarOferta':
          // this.enviarOfertaEvent.emit(this.listaOferta);
          let oferta={
            idUserQueOferto:this.authService.user['id'],
            listaDeProductos:this.listaOferta,
            efectivo:(this.publicacionObjetivo.precio-this.precioActual),
            estadoOferta:"pendiente"
          };

          if(this.publicacionObjetivo.listaDeOfertas){
            listaOfertasExistentes= this.publicacionObjetivo.listaDeOfertas
          }
          listaOfertasExistentes.push(oferta);
          this.publicacionObjetivo.listaDeOfertas=listaOfertasExistentes;
        
          this.dataBase.actualizar('publicaciones',this.publicacionObjetivo,this.publicacionObjetivo.id).then(()=>{
            alert("Oferta enviada con exito");
          }).catch(()=>{
            alert("NO SE PUDO ENVIAR LA OFERTA!");
          })
          break;
        
      }
    }
  ngOnInit(): void {
    let contador=0;
    this.authService.buscarUsuarioLogueado();
    this.dataBase.obtenerTodos('publicaciones').subscribe((res)=>{
      // this.user=this.authService.user;
      if(contador==0)
      {
        contador++;
        res.forEach(response => {                
          const publicacion=response.payload.doc.data();
          if(publicacion['idUserQuePublico']==this.authService.user['id'] && 
          publicacion['estadoPublicacion']=='aceptado' 
          ){
            this.myListaDePublicaciones.push(publicacion);
          }
        });
      }
    });
  }
  ngOnDestroy(){
    this.myListaDePublicaciones=[];
  }

}
