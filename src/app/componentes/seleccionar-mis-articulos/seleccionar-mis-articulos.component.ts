import { Component, Inject, Input, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneradorNotificacionesService } from 'src/app/servicios/generador-notificaciones.service';
@Component({
  selector: 'app-seleccionar-mis-articulos',
  templateUrl: './seleccionar-mis-articulos.component.html',
  styleUrls: ['./seleccionar-mis-articulos.component.css']
})
export class SeleccionarMisArticulosComponent implements OnInit {
  @Input() publicacionObjetivo;
   myListaDePublicaciones= [];
  listaOferta = [];
  valorAcumulado=0;
  contador=0;
  @Output() cancelarEvent:EventEmitter<any>=new EventEmitter<any>();
  // @Output() enviarOfertaEvent:EventEmitter<any>=new EventEmitter<any>();

  calcularvalorAcumuladoActual(){
    let retorno=0;
    this.listaOferta.forEach(element => {
      retorno+= element.precio;

    });
    return retorno;
  }
  drop(event: CdkDragDrop<string[]>) {
    let productoArrastrado=event.previousContainer.data[event.previousIndex];
    let valorAcumulado=0;
    if(event.previousContainer.id[event.previousContainer.id.length-1]=="0"){//mueve de disponible a ofrecer
      valorAcumulado =this.calcularvalorAcumuladoActual()+productoArrastrado['precio'];
    }else{//de ofrecer vuevle a disponible
      valorAcumulado =this.calcularvalorAcumuladoActual()-productoArrastrado['precio'];
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        if(valorAcumulado<=this.publicacionObjetivo.precio){//tiene dinero a favor!      
          this.valorAcumulado=this.calcularvalorAcumuladoActual();
        }
        else{//tiene dinero en contra
          this.valorAcumulado=this.calcularvalorAcumuladoActual();
        }
    }
  }
  constructor(
    private dataBase: DatabaseService,
    private authService:AuthService,
    private genNotificacion : GeneradorNotificacionesService
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
            efectivo:this.publicacionObjetivo.precio-this.valorAcumulado,
            estadoOferta:"pendiente"
          };

          if(this.publicacionObjetivo.listaDeOfertas){
            listaOfertasExistentes= this.publicacionObjetivo.listaDeOfertas
          }
          listaOfertasExistentes.push(oferta);
          this.publicacionObjetivo.listaDeOfertas=listaOfertasExistentes;
          this.dataBase.actualizar('publicaciones',this.publicacionObjetivo,this.publicacionObjetivo.id).then(()=>{
            alert("Oferta enviada con exito");


            // NOTIFICACIÓN:
            this.genNotificacion.crearNotificacionCompraVenta(this.publicacionObjetivo.idUserQuePublico, this.authService.user['id'], "compraventa", "El usuario " + this.authService.user.nombre + " te ha ofrecido una permuta.");
            // le avisa al que compró.                 
            this.genNotificacion.crearNotificacionCompraVenta(this.authService.user['id'], this.publicacionObjetivo.idUserQuePublico, "compraventa", "Permuta realizada con éxito");
    

          }).catch(()=>{
            alert("NO SE PUDO ENVIAR LA OFERTA!");
          })
          break;
        
      }
    }
  //   let scrollToTop = window.setInterval(() => {
  //     let pos = window.pageYOffset;
  //     if (pos > 0) {
  //         window.scrollTo(0, pos - 20); // how far to scroll on each step
  //     } else {
  //         window.clearInterval(scrollToTop);
  //     }
  // }, 16);
  scrollToElement(id){
    let element = document.getElementById(id);
    if (element != null) {
      scroll({
        top: element.offsetTop,
        behavior: "smooth"
      });
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
