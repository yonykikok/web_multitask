import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';

//FORMBUILDER.
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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


  // VARIABLES PARA MODIFICAR DATOS CON FORM BUILDER. 

  nuevosDatosForm: FormGroup;

  nuevosDatosJSON = {
    nombre: "",
    apellido: "",
  };


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
  mostrarDivEditar = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { 

    this.nuevosDatosForm = this.formBuilder.group({

      nombreValidado: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]{4,20}$')]],

      apellidoValidado: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]{4,20}$')]],

    });

  }

  public mostrarErrorRegistro(control: string): string {

    let retorno = '';

    switch (control) {

      case 'nombreValidado':

        if (this.nuevosDatosForm.controls.nombreValidado.hasError('required')) {
          retorno = 'Debe ingresar un nombre.';
        }

        if (this.nuevosDatosForm.controls.nombreValidado.hasError('minLength')) {
          retorno = 'Debe ingresar un nombre válido.';
        }

        if (this.nuevosDatosForm.controls.nombreValidado.hasError('pattern')) {
          retorno = 'Error con el formato del nombre.';
        }

        break;

      case 'apellidoValidado':

        if (this.nuevosDatosForm.controls.apellidoValidado.hasError('required')) {
          retorno = 'Debe ingresar un apellido.';
        }

        if (this.nuevosDatosForm.controls.apellidoValidado.hasError('minLength')) {
          retorno = 'Debe ingresar un apellido válido.';
        }

        if (this.nuevosDatosForm.controls.apellidoValidado.hasError('pattern')) {
          retorno = 'Error con el formato del apellido.';
        }

        break;

    }

    return retorno;
  }





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

  actualizarDatos(){
    
  }

}
