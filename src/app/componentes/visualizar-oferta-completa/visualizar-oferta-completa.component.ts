import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-visualizar-oferta-completa',
  templateUrl: './visualizar-oferta-completa.component.html',
  styleUrls: ['./visualizar-oferta-completa.component.css']
})
export class VisualizarOfertaCompletaComponent implements OnInit {
  listaDeOfertas;
  ampliarOferta=false;
  constructor( private dialogRef: MatDialogRef<VisualizarOfertaCompletaComponent>,
    @Inject(MAT_DIALOG_DATA) data, private authService:AuthService) { 
      this.listaDeOfertas = data.listaDeOfertas;
      // this.esVistaCompleta=data.esVistaCompleta;
    }
    
  ngOnInit(): void {
    console.log(this.listaDeOfertas);
  }

}
