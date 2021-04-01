import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  user:Usuario;
  @Input() mostrarHamburger=true;
  @Input() userIsLogged=false;

  @Output() ingresarEventClick:EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    setTimeout(() => {      
      if(this.authService.user!=null)
      {
        this.user=this.authService.user;
        console.log(this.authService.user.toString());
      }
    }, 200);
  }

  SendEventClickJHamburgerMenu(){

  }

  enviarEventoDeIngreso(){
    this.ingresarEventClick.emit();
  }
}
