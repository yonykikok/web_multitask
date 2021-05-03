import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeComponent } from 'src/app/paginas/home/home.component';
@Component({
  selector: 'app-formulario-de-pago',
  templateUrl: './formulario-de-pago.component.html',
  styleUrls: ['./formulario-de-pago.component.css']
})
export class FormularioDePagoComponent implements OnInit {

  @Input() esDorso = false;
  @Input() datosTarjeta;


  constructor() { }

  ngOnInit() {
    console.log("ON INIT");
  }



}
