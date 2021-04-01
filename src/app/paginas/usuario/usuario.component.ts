import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  user: Usuario;
  userIsLogged;
  mostrarFormLogin = true;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    setTimeout(() => {
      if (this.authService.user != null) {
        this.user = this.authService.user;
        console.log(this.authService.user.toString());
      }
    }, 200);
  }

  ngOnChanges() {
    this.userIsLogged = this.authService.isLogged;
  }

}
