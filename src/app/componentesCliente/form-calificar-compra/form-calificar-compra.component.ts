import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-calificar-compra',
  templateUrl: './form-calificar-compra.component.html',
  styleUrls: ['./form-calificar-compra.component.css']
})
export class FormCalificarCompraComponent implements OnInit {
  comentario = "";
  puntos = 1;
  @Output() calificarEvent = new EventEmitter<object>();
  constructor() { }

  ngOnInit(): void {
  }
  calificarUsuario() {
    let calificacion = {
      comentario: this.comentario,
      puntos: this.puntos
    }
    this.calificarEvent.emit(calificacion)
  }
  rellenarEstrellas(cantidad) {
    this.puntos = cantidad;
    let estrellas = Array.from(document.getElementsByClassName("star"));
    estrellas.forEach((element, index) => {
      if (index < cantidad) {
        element.setAttribute("style", "color:yellow")
      } else {
        element.setAttribute("style", "color:rgba(51, 51, 51, 0.616)")
      }
    });
    switch (cantidad) {
      case 1:
        this.comentario = "Tuve una mala experiencia porque: ";
        break;
      case 2:
        this.comentario = "No fue lo que esperaba porque: ";
        break;
      case 3:
        this.comentario = "Normal, pero podria mejorar: ";
        break;
      case 4:
        this.comentario = "Buena experiencia, todo correcto";
        break;
      case 5:
        this.comentario = "Excelente vendedor todo en tiempo y forma";
        break;
    }

  }
}
