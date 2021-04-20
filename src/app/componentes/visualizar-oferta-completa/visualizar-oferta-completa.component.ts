import { Component, Inject, OnInit, Input} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';


@Component({
  selector: 'app-visualizar-oferta-completa',
  templateUrl: './visualizar-oferta-completa.component.html',
  styleUrls: ['./visualizar-oferta-completa.component.css']
})
export class VisualizarOfertaCompletaComponent implements OnInit {
  
  publicacionOriginal;


  listaDeOfertas;
  ampliarOferta=false;
  constructor( private dialogRef: MatDialogRef<VisualizarOfertaCompletaComponent>,
    @Inject(MAT_DIALOG_DATA) data, private authService:AuthService, private dataBase: DatabaseService,) { 
      this.listaDeOfertas = data.listaDeOfertas;
      this.publicacionOriginal = data.publicacionOriginal;
    }
    
  ngOnInit(): void {
    console.log(this.listaDeOfertas);
  }

  aceptarORechazarOferta(oferta,estado)
  {  
    this.publicacionOriginal.listaDeOfertas.forEach(auxOferta => {

    if(auxOferta===oferta){
        auxOferta.estadoOferta = estado;
        if(estado==='aceptadaParaPermutar'){
          this.publicacionOriginal.estadoPublicacion="permutaPendiente";
        }
      }
    });
  
    this.dataBase.actualizar('publicaciones', this.publicacionOriginal, this.publicacionOriginal.id).then(()=>{
      alert("Oferta actualizada con exito");
    }).catch(()=>{
      alert("NO SE PUDO ENVIAR LA OFERTA!");
    })    
  }



}
