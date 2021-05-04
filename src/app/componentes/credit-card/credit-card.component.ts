import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  
  @Input() esDorso = false;
  @Input() datosTarjeta;


  constructor() { }

  ngOnInit() {
    console.log("ON INIT");
  }

}
