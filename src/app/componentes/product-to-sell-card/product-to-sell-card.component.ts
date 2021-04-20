import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetalladoPublicacionComponent } from '../detallado-publicacion/detallado-publicacion.component';
import { SeleccionarMisArticulosComponent } from '../seleccionar-mis-articulos/seleccionar-mis-articulos.component';

@Component({
  selector: 'app-product-to-sell-card',
  templateUrl: './product-to-sell-card.component.html',
  styleUrls: ['./product-to-sell-card.component.css']
})
export class ProductToSellCardComponent implements OnInit {

  @Input() esVistaCompleta=true;
  @Input() publicacion;
  @Output() permutarClickEvent:EventEmitter<boolean>=new EventEmitter<boolean>(); 
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(publicacion) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      publicacion:publicacion,
      esVistaCompleta:this.esVistaCompleta
    }
    const dialogRef = this.dialog.open(DetalladoPublicacionComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    
      switch(result){
        case 'permutar':
          // this.dialog.open(SeleccionarMisArticulosComponent,dialogConfig);
          this.permutarClickEvent.emit(dialogConfig.data.publicacion);
          break;
        case 'comprar':
          break;
        default:
          //no hacemos nada!
          break;
      }
    });
  }
}
