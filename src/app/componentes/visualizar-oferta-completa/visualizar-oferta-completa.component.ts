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


  // ACA NECESITO SABER COMO OBTENER LA PUBLICACION ORIGINAL QUE VIENE DESDE EL MAT TABLE.
  publicacionOriginal;


  listaDeOfertas;
  ampliarOferta=false;
  constructor( private dialogRef: MatDialogRef<VisualizarOfertaCompletaComponent>,
    @Inject(MAT_DIALOG_DATA) data, private authService:AuthService, private dataBase: DatabaseService,) { 
      this.listaDeOfertas = data.listaDeOfertas;
      // this.esVistaCompleta=data.esVistaCompleta;
    }
    
  ngOnInit(): void {
    console.log(this.listaDeOfertas);
  }



  aceptarOferta(oferta)
  {
    let listaOfertasExistentes=[];

    // Acá cambio el estado de la oferta seleccionada a "aceptadaParaPermutar"
    console.log("Desactualizada: " + oferta);
    oferta.estadoOferta = "aceptadaParaPermutar";
    console.log("Actualizada: " + oferta);


    // Acá obtengo la publicación objetivo. Y veo que va a tener una lista de ofertas, las guardo asi no se pierden
    if(this.publicacionOriginal.listaDeOfertas)
    {
      listaOfertasExistentes= this.publicacionOriginal.listaDeOfertas
    }

    // guardo la nueva oferta con el estado modificado.
    listaOfertasExistentes.push(oferta);

  
    // seteo la lista de ofertas de la publicación original
    this.publicacionOriginal.listaDeOfertas = listaOfertasExistentes;


    // ESTO LO COMENTO, PERO DEBERIA FUNCIONAR SI TUVIERA LA PUBLICACIÓN ORIGINAL
    /*
     this.dataBase.actualizar('publicaciones', this.publicacionOriginal, this.publicacionOriginal.id).then(()=>{
      alert("Oferta actualizada con exito");
    }).catch(()=>{
      alert("NO SE PUDO ENVIAR LA OFERTA!");
    })
    */

  }


  rechazarOferta(oferta)
  {
    let listaOfertasExistentes=[];

    // Acá cambio el estado de la oferta seleccionada a "aceptadaParaPermutar"
    console.log("Desactualizada: " + oferta);
    oferta.estadoOferta = "rechazadaParaPermutar";
    console.log("Actualizada: " + oferta);


    // Acá obtengo la publicación objetivo. Y veo que va a tener una lista de ofertas, las guardo asi no se pierden
    if(this.publicacionOriginal.listaDeOfertas)
    {
      listaOfertasExistentes= this.publicacionOriginal.listaDeOfertas
    }

    // guardo la nueva oferta con el estado modificado.
    listaOfertasExistentes.push(oferta);

  
    // seteo la lista de ofertas de la publicación original
    this.publicacionOriginal.listaDeOfertas = listaOfertasExistentes;


    // ESTO LO COMENTO, PERO DEBERIA FUNCIONAR SI TUVIERA LA PUBLICACIÓN ORIGINAL
    /*
     this.dataBase.actualizar('publicaciones', this.publicacionOriginal, this.publicacionOriginal.id).then(()=>{
      alert("Oferta actualizada con exito");
    }).catch(()=>{
      alert("NO SE PUDO ENVIAR LA OFERTA!");
    })
    */
  }

}
