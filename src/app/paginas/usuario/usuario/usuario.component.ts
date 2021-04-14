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
  pedido = "";

  //ADMIN
  boolRegistroCliente = false;
  boolRegistroEmpleado = false;
  boolListadoCuentas = false;
  booEstadisticas = false;
  boolAdministrarPublicaciones = false;
  
  // EMPLEADO
  boolResponderConsultas = false;

  //CLIENTE Y ST
  boolServicio = false;
  boolPubliciones = false;
  boolResenias = false;
  boolConsultas = false;
  boolFormPublicar=false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser$ = this.authService.obtenerUsuario$();
    this.currentUser$.subscribe(usuarios => {
      this.user = usuarios;
    });
    this.authService.actualizarUsuario();
  }

  //ADMIN
  mostrarRegistroCliente() {
    this.boolRegistroCliente = true;
    this.boolRegistroEmpleado = false;
    this.boolListadoCuentas = false;
    this.booEstadisticas = false;
    this.boolAdministrarPublicaciones = false;
    this.boolResponderConsultas = false;
  }

  mostrarRegistroEmpleado() {
    this.boolRegistroCliente = false;
    this.boolRegistroEmpleado = true;
    this.boolListadoCuentas = false;
    this.booEstadisticas = false;
    this.boolAdministrarPublicaciones = false;
  }

  mostrarListadoCuentas() {
    this.boolRegistroCliente = false;
    this.boolRegistroEmpleado = false;
    this.boolListadoCuentas = true;
    this.booEstadisticas = false;
    this.boolAdministrarPublicaciones = false; 
    this.boolResponderConsultas = false;
  }

  mostrarPublicacionesPendientes() {
    this.boolRegistroCliente = false;
    this.boolRegistroEmpleado = false;
    this.boolListadoCuentas = false;
    this.booEstadisticas = false;
    this.boolAdministrarPublicaciones = true;   
    this.boolResponderConsultas = false;
  }

  mostrarEstadisticas() {
    this.boolRegistroCliente = false;
    this.boolRegistroEmpleado = false;
    this.boolListadoCuentas = false;
    this.booEstadisticas = true;
    this.boolAdministrarPublicaciones = false;   
  }

  // EMPLEADO
  mostrarResponderConsultas() {
    this.boolResponderConsultas = true;
    this.boolRegistroCliente = false;
    this.boolListadoCuentas = false;
    this.boolAdministrarPublicaciones = false;   
  }

  // CLIENTE Y ST
  mostrarServicio(){
    this.boolServicio = true;
    this.boolPubliciones = false;
    this.boolResenias = false;
    this.boolConsultas = false;
  }

  mostrarPublicaciones(){
    this.boolServicio = false;
    this.boolPubliciones = true;
    this.boolResenias = false;
    this.boolConsultas = false;
  }

  mostrarResenias(){
    this.boolServicio = false;
    this.boolPubliciones = false;
    this.boolResenias = true;
    this.boolConsultas = false;
  }

  mostrarConsultas(){
    this.boolServicio = false;
    this.boolPubliciones = false;
    this.boolResenias = false;
    this.boolConsultas = true;
  }

}
