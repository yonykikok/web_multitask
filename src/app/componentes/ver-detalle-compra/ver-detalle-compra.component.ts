import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/servicios/database.service';
import { ChatCompraComponent } from '../chat-compra/chat-compra.component';

@Component({
  selector: 'app-ver-detalle-compra',
  templateUrl: './ver-detalle-compra.component.html',
  styleUrls: ['./ver-detalle-compra.component.css']
})
export class VerDetalleCompraComponent implements OnInit {
  mostrarOpciones = false;
  mostrarFormCalificar = false;
  compra;
  comprador;
  vendedor;
  rolEnLaCompra;
  constructor(public dialog: MatDialog,
    private dataBase: DatabaseService,
    private dialogRef: MatDialogRef<VerDetalleCompraComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.compra = data.compra;
    this.comprador = data.comprador;
    this.vendedor = data.vendedor;
    this.rolEnLaCompra = data.rolEnLaCompra;
  }

  ngOnInit(): void {

  }
  openChat() {
    !this.compra.mensajes ? this.compra['mensajes'] = [] : null
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      compra: this.compra
    }
    const dialogRef = this.dialog.open(ChatCompraComponent, dialogConfig);
  }
  mostrarForm() {
    this.mostrarFormCalificar = !this.mostrarFormCalificar;
    this.mostrarOpciones = false;
  }


  calificarCompra(calificacion) {
    this.mostrarFormCalificar=false;
    calificacion['compra'] = this.compra;

    this.agregarCalificacionAlUsuario(calificacion);
    this.cambiarEstadoDeCompraACalificado();

  }
  cambiarEstadoDeCompraACalificado() {
    this.compra.estadoCalificacion = "calificado";
    this.dataBase.actualizar("compras", this.compra, this.compra.id);
  }
  agregarCalificacionAlUsuario(calificacion) {
    let contador = 0;
    this.dataBase.obtenerPorId("usuarios", this.compra.idVendedor).subscribe(res => {
      let vendedor = res.payload.data();
      if (vendedor['reputacion']) {
        vendedor['reputacion']['resenias'].push(calificacion);
        vendedor['reputacion']['cantDeResenias'] += 1;
        vendedor['reputacion']['cantDePuntos'] += calificacion.puntos;
        vendedor['reputacion']['calificacionGeneral'] = (vendedor['reputacion']['cantDePuntos'] / vendedor['reputacion']['cantDeResenias']) * 20;
        // console.log("calificacionNueva: ", vendedor['reputacion']);
      } else {
        vendedor['reputacion'] = {
          resenias: [calificacion],
          cantDeResenias: 1,
          cantDePuntos: calificacion.puntos,
          calificacionGeneral: calificacion.puntos
        }
        // console.log("primaraCalificacion: ", vendedor['reputacion']);
      }
      if (contador == 0) {
        contador++;
        this.dataBase.actualizar("usuarios", vendedor, vendedor['id']);
      }


    });
  }
}
