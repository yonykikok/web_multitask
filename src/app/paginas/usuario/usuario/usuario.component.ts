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
  selectPublicaciones = "activas";
  user: Usuario;
  currentUser$: Observable<Usuario>;
  pedido = "";
  mostrarDivNotificaciones = false;
  notificacioens = ["compro tal cosa", "vendio tal cosa", "permuto tal cosa"];

  //ADMIN
  boolTransacciones = false;
  boolRegistroCliente = false;
  boolRegistroEmpleado = false;
  boolListadoCuentas = false;
  booEstadisticas = false;
  boolAdministrarPublicaciones = false;

  // EMPLEADO
  boolResponderConsultas = false;
  boolGenerarReparacion = false;
  boolReparacionesPendientes = false;

  //CLIENTE Y ST
  boolServicio = false;
  boolPubliciones = false;
  boolReputacion = false;
  boolConsultas = false;
  boolFormPublicar = false;
  boolFormMisPermutas = false;
  boolOfertasRealizadas = false;

  // Todos
  boolNotificaciones = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser$ = this.authService.obtenerUsuario$();
    this.currentUser$.subscribe(usuarios => {
      this.user = usuarios;
    });
    this.authService.actualizarUsuario();
  }
  cambiarSeleccion() {
    this.selectPublicaciones = document.getElementById("selectPublicaciones")['value'];
  }
  mostrar(variable, idDivContenedor) {
    this.reiniciarEstadosAFalse();
    this[variable] = true;

    setTimeout(() => {
      this.scrollToElement(idDivContenedor);
    }, 600);
  }


  reiniciarEstadosAFalse() {
    //ADMIN
    this.boolRegistroCliente = false;
    this.boolRegistroEmpleado = false;
    this.boolListadoCuentas = false;
    this.booEstadisticas = false;
    this.boolAdministrarPublicaciones = false;


    // EMPLEADO
    this.boolResponderConsultas = false;
    this.boolGenerarReparacion = false;
    this.boolReparacionesPendientes = false;

    //CLIENTE Y ST
    this.boolServicio = false;
    this.boolPubliciones = false;
    this.boolReputacion = false;
    this.boolConsultas = false;
    this.boolFormPublicar = false;
    this.boolFormMisPermutas = false;
    this.boolOfertasRealizadas = false;

    // todo

    this.boolNotificaciones = false;
    this.boolTransacciones = false;
  }
  scrollToElement(id) {
    let element = document.getElementById(id);
    if (element != null) {
      scroll({
        top: element.offsetTop,
        behavior: "smooth"
      });
    }
  }

}
