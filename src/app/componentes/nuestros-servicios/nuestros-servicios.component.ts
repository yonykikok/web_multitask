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
    descripcion:" Servicio técnico especializado, hacemos todo tipo de reparaciones. Cambio de pantalla, Flasheos, Liberaciones, Pin de carga, Microfonos etc."
  },{
    titulo:"Compra venta",
    srcImagen:"https://i.imgur.com/lVYWhNF.png",
    // descripcion:" Servicio técnico especializado, para poder resolver cualquier tipo de consulta antes de traernos tu dispositivo o articulos que quieras reparar con nosotros"
    descripcion:"En nuestra pagina tendras disponible un E-commerce donde podras comprar varios de nuestros productos."
   },{
    titulo:"Sistema de permutas",
    srcImagen:"https://i.imgur.com/tJopjA1.png",
    descripcion:"Nuestro inovador sistema de permutas permite que puedas publicar tu propio producto y ofrecerlo como permuta por algun otro producto publicado."
  }]
  constructor() { }

  ngOnInit(): void {
  }

}
