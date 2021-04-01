import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// LOGIN FORMBUILDER.
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// SERVICIO AUTH.
import { AuthService } from "../../servicios/auth.service"
// ROUTER
import { Router } from '@angular/router';
// FIRESTORE
import { AngularFirestore } from "@angular/fire/firestore";
import jwt_decode from "jwt-decode"; // ESTO LO OBTENGO CON npm i jwt-decode
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  //test guard
  tokenUsuario;
  payloadUsuario;
  emailUsuario;
  //fin test guard
  quiereRegistrarse = false;
  cuenta;

  private ocultaClave = true;
  public correo;
  public clave;
  formularioLogin: FormGroup;

  //evento de salida
  @Output() ingresarEventClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() cancelLoginEventClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private routerService: Router,
    private firestore: AngularFirestore) {
    this.formularioLogin = this.formBuilder.group({
      claveValidada: ['', [Validators.required, Validators.minLength(6)]],
      correoValidado: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.tokenUsuario = localStorage.getItem('token');
    this.payloadUsuario = jwt_decode(this.tokenUsuario);
    this.emailUsuario = this.payloadUsuario.email;
    this.buscarInfoLogueado();
  }

  buscarInfoLogueado() {
    let usuario: Usuario;
    this.firestore.collection('usuarios').get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        if (doc.data()['correo'] == this.emailUsuario) {
          usuario = new Usuario(doc.data()['nombre'], doc.data()['apellido'], doc.data()['DNI'], doc.data()['correo'], doc.data()['tipo'], doc.data()['foto']);
          this.authService.user = usuario;
        }
      })
    })

  }

  cerrarFormLogin() {
    this.cancelLoginEventClick.emit();
  }
  public setOcultaClave(valor: boolean): void {
    this.ocultaClave = valor;
  }

  public getOcultaClave(): boolean {
    return this.ocultaClave;
  }

  public mostrarError(control: string): string {
    let retorno = '';
    switch (control) {
      case 'correoValidado':
        if (this.formularioLogin.controls.correoValidado.hasError('required')) {
          retorno = 'Debe ingresar un correo electrónico.';
        }
        else if (this.formularioLogin.controls.correoValidado.hasError('email')) {
          retorno = 'Debe ingresar un correo electrónico válido.';
        }
        else {
          retorno = 'Error con el correo.';
        }
        break;
      case 'claveValidada':
        if (this.formularioLogin.controls.claveValidada.hasError('required')) {
          retorno = 'Debe ingresar una clave';
        }
        else if (this.formularioLogin.controls.claveValidada.hasError('minlength')) {
          retorno = 'La clave ingresada debe contener al menos 6 caracteres';
        }
        break;
    }
    return retorno;
  }

  onSubmitLogin() {
    this.authService.login(this.correo, this.clave)
      .then((res) => {
        this.ingresarEventClick.emit();//si llega a esta linea es porque el usuario se logeo exitosamete
        // this.routerService.navigate(['/home'])
        console.log("1----------------");
      }).catch(err => alert("Los datos son incorrectos. No existe tal usuario"));
  }

  irRegistrarse() {
    this.routerService.navigate(['/registro']);
  }

  selecCuenta() {
    switch (this.cuenta) {
      case "admin": {
        this.clave = "123456";
        this.correo = "admin@gmail.com";
        break;
      }
      case "emple": {
        this.clave = "123456";
        this.correo = "empleadoUno@hotmail.com";
        break;
      }
      case "clie1": {
        this.clave = "123456";
        this.correo = "clienteUno@hotmail.com";
        break;
      }
      case "st": {
        this.clave = "123456";
        this.correo = "serviciotecnico@gmail.com";
        break;
      }
      default: {
        break;
      }
    }
    this.onSubmitLogin();
  }


}
