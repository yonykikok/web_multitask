import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuestros-servicios',
  templateUrl: './nuestros-servicios.component.html',
  styleUrls: ['./nuestros-servicios.component.css']
})
export class NuestrosServiciosComponent implements OnInit {

  servicios=[{
    titulo:"Servicio técnico",
    srcImagen:"https://i.imgur.com/4DQtQon.png",
    descripcion:" Servicio técnico especializado, para poder resolver cualquier tipo de consulta antes de traernos tu dispositivo o articulos que quieras reparar con nosotros"
  },{
    titulo:"Compra venta",
    srcImagen:"https://i.imgur.com/lVYWhNF.png",
    descripcion:" Servicio técnico especializado, para poder resolver cualquier tipo de consulta antes de traernos tu dispositivo o articulos que quieras reparar con nosotros"
  },{
    titulo:"Sistema de permutas",
    srcImagen:"https://i.imgur.com/tJopjA1.png",
    descripcion:" Servicio técnico especializado, para poder resolver cualquier tipo de consulta antes de traernos tu dispositivo o articulos que quieras reparar con nosotros"
  }]
  constructor() { }

  ngOnInit(): void {
  }

}
