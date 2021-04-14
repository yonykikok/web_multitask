import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-detallado-publicacion',
  templateUrl: './detallado-publicacion.component.html',
  styleUrls: ['./detallado-publicacion.component.css']
})
export class DetalladoPublicacionComponent implements OnInit {

  publicacion;
  esVistaCompleta;
  constructor( private dialogRef: MatDialogRef<DetalladoPublicacionComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.publicacion = data.publicacion;
      this.esVistaCompleta=data.esVistaCompleta;
    }

  ngOnInit(): void {
    console.log(this.publicacion);
  }
  mostrarListaDeMisPublicaciones(){
      
  }
}
