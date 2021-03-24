import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() mostrarHamburger=true;
  @Input() userIsLogged=false;

  @Output() ingresarEventClick:EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  SendEventClickJHamburgerMenu(){

  }

  enviarEventoDeIngreso(){
    this.ingresarEventClick.emit();
  }
}
