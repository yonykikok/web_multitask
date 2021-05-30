import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/servicios/database.service';
import { ChatCompraComponent } from '../chat-compra/chat-compra.component';
import { ChatPermutaComponent } from '../chat-permuta/chat-permuta.component';
import { DetalladoPublicacionComponent } from '../detallado-publicacion/detallado-publicacion.component';
import { VerDetalleCompraComponent } from '../ver-detalle-compra/ver-detalle-compra.component';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  mostrarOpciones = false;
  mostarFormConfirmacion = false;
  @Input() compra;
  vendedor;
  comprador;
  fechaCompra;
  @Input() rolEnLaCompra;
  constructor(private dataBase: DatabaseService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    switch (this.rolEnLaCompra) {
      case "comprador":
        this.dataBase.obtenerPorId("usuarios", this.compra.idVendedor).subscribe((res) => {
          this.vendedor = res.payload.data();
          this.fechaCompra = new Date(this.compra.fechaCompra.seconds * 1000 + this.compra.fechaCompra.nanoseconds / 1000000).toLocaleDateString();
        });
        break;
      case "vendedor":
        this.dataBase.obtenerPorId("usuarios", this.compra.idComprador).subscribe((res) => {
          this.comprador = res.payload.data();
          this.fechaCompra = new Date(this.compra.fechaCompra.seconds * 1000 + this.compra.fechaCompra.nanoseconds / 1000000).toLocaleDateString();
        });
        break;
    }

  }


  openDetalleProducto(publicacion) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      publicacion: publicacion,
      esSoloVista: true
    }
    const dialogRef = this.dialog.open(DetalladoPublicacionComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(result => {    });
  }

  openChat() {
    !this.compra.mensajes ? this.compra['mensajes'] = [] : null
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      compra: this.compra
    }
    const dialogRef = this.dialog.open(ChatCompraComponent, dialogConfig);
  }

  openVerDetalleCompra() {
    this.mostrarOpciones = false;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass="scrolleable";
    dialogConfig.data = {
      compra: this.compra,
      vendedor: this.vendedor,
      comprador: this.comprador,
      rolEnLaCompra:this.rolEnLaCompra
    }
    const dialogRef = this.dialog.open(VerDetalleCompraComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(result => {    });
  }



  confirmarTransaccion() {
    this.compra.estado = "concretado";
    // this.compra['idUserQueNotificoConcretacion']
    this.dataBase.actualizar('compras',this.compra,this.compra.id)
    .then(()=>{
        alert("Actualizacion exitosa");
    });
  }


}
