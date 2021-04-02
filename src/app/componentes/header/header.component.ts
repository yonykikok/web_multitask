import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() mostrarHamburger=true;
  @Input() userIsLogged;

  @Output() ingresarEventClick:EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private authService : AuthService) { }

  ngOnInit(): void {

    this.userIsLogged = this.authService.isLogged;

  }

  SendEventClickJHamburgerMenu(){

  }

  enviarEventoDeIngreso(){
    this.ingresarEventClick.emit();
  }
}
