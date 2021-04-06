import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {

  user: Usuario;
  currentUser$: Observable<Usuario>;

  //ADMIN
  boolRegistroCliente = false;
  boolRegistroEmpleado = false;
  boolListadoCuentas = false;
  

  // EMPLEADO
  boolResponderConsultas = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser$ = this.authService.obtenerUsuario$();
    this.currentUser$.subscribe(usuarios => {
      this.user = usuarios;
    });
    this.authService.actualizarUsuario();
  }

  mostrarRegistroCliente() {
    this.boolRegistroCliente = true;
    this.boolRegistroEmpleado = false;
    this.boolListadoCuentas = false;
    this.boolResponderConsultas = false;

  }

  mostrarRegistroEmpleado() {
    this.boolRegistroCliente = false;
    this.boolRegistroEmpleado = true;
    this.boolListadoCuentas = false;
  }

  mostrarListadoCuentas() {
    this.boolRegistroCliente = false;
    this.boolRegistroEmpleado = false;
    this.boolListadoCuentas = true;
   
  }


  // EMPLEADO

  mostrarResponderConsultas() {
    this.boolRegistroCliente = false;
    this.boolResponderConsultas = true;
  }




}
