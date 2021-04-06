import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horario-de-apertura',
  templateUrl: './horario-de-apertura.component.html',
  styleUrls: ['./horario-de-apertura.component.css']
})
export class HorarioDeAperturaComponent implements OnInit {
  horarioDeapertura:Date;
  mensajeAMostrar;
  constructor() { }


  ngOnInit(): void {
    
    this.horarioDeapertura=new Date("2021-04-05 23:37:22");
    
    let dia= this.horarioDeapertura.getDay();
    let hora= this.horarioDeapertura.getHours();
    alert(dia);
      if(dia!=0){
        if(hora>=0 && hora<9){
          this.mensajeAMostrar="Faltan "+(9-hora)+"hs para que abra el local";
        }
        else if(hora>=9 && hora<=13|| hora>=17&& hora<=19){
          this.mensajeAMostrar="Abierto";
        }else if(hora>13 && hora<17){
          this.mensajeAMostrar="Faltan "+(17-hora)+"hs para que abra el local";
        }else if(hora>19){
          this.mensajeAMostrar="Faltan "+(33-hora)+"hs para que abra el local";
        }
      }else{
        this.mensajeAMostrar="Abre el lunes a las 9am";
      }
  }

}
