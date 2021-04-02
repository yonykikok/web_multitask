import { Component, OnInit } from '@angular/core';
// FIREBASE:
import * as firebase from 'firebase'
// FIREBASE STORAGE
import { AngularFireStorage } from "@angular/fire/storage"
// REGISTRO FORMBUILDER.
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// SERVICIO DATABASE.
import { DatabaseService } from "../../../servicios/database.service"
// SERVICIO AUTH.
import { AuthService } from "../../../servicios/auth.service"
// ROUTER
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-registro-empleado',
  templateUrl: './registro-empleado.component.html',
  styleUrls: ['./registro-empleado.component.css']
})
export class RegistroEmpleadoComponent implements OnInit {

  private ocultaClave = true;

  preimagen;
  seEligioImagen = false;

  nombreGrupoValidador: FormGroup;
  apellidoGrupoValidador: FormGroup;
  DNIGrupoValidador: FormGroup;
  contactoGrupoValidador: FormGroup;
  contraseniaGrupoValidador: FormGroup;
  fotoGrupoValidador: FormGroup;


  usuarioJSON = {
    nombre: "",
    apellido: "",
    DNI: "",
    correo: "@gmail.com",
    numero: "",
    tipo: "empleado",
    // CAMBIAR ESTO, PORQUE ES UN LINK DE DESCARGA EN LUGAR DE UNO DE VISUALIZACION POR DEFECTO.
    foto: "https://firebasestorage.googleapis.com/v0/b/tp-ppsii.appspot.com/o/defaultUserIMG.png?alt=media&token=d3d95cee-dc8e-4d8a-9d67-ac5a51ba62a6",
    contrasenia: "",
    repetirContrasenia: "",
  };


  constructor(private formBuilder: FormBuilder,

    private authService: AuthService,
    private routerService: Router,
    private dataBase: DatabaseService,
    private st: AngularFireStorage,

  ) {
    this.nombreGrupoValidador = this.formBuilder.group({
      nombreValidado: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]{4,20}$')]],
    });
    this.apellidoGrupoValidador = this.formBuilder.group({
      apellidoValidado: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]{4,20}$')]],
    });
    this.DNIGrupoValidador = this.formBuilder.group({
      DNIValidado: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    });
    this.contactoGrupoValidador = this.formBuilder.group({
      correoValidado: ['', [Validators.required, Validators.email]],
      numeroValidado: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
    this.contraseniaGrupoValidador = this.formBuilder.group({
      contraseniaValidada: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.fotoGrupoValidador = this.formBuilder.group({
    });
  }

  ngOnInit(): void {
  }

  handleImage(e: any): void {
    this.seEligioImagen = true;
    this.preimagen = e.target.files[0];
  }

  public setOcultaClave(valor: boolean): void {
    this.ocultaClave = valor;
  }

  public getOcultaClave(): boolean {
    return this.ocultaClave;
  }

  public mostrarErrorRegistro(control: string): string {
    let retorno = '';
    switch (control) {
      case 'nombreValidado':
        if (this.nombreGrupoValidador.controls.nombreValidado.hasError('required')) {
          retorno = 'Debe ingresar un nombre.';
        }
        if (this.nombreGrupoValidador.controls.nombreValidado.hasError('minLength')) {
          retorno = 'Debe ingresar un nombre válido.';
        }
        if (this.nombreGrupoValidador.controls.nombreValidado.hasError('pattern')) {
          retorno = 'Error con el formato del nombre.';
        }
        break;

      case 'apellidoValidado':
        if (this.apellidoGrupoValidador.controls.apellidoValidado.hasError('required')) {
          retorno = 'Debe ingresar un apellido.';
        }
        if (this.apellidoGrupoValidador.controls.apellidoValidado.hasError('minLength')) {
          retorno = 'Debe ingresar un apellido válido.';
        }
        if (this.apellidoGrupoValidador.controls.apellidoValidado.hasError('pattern')) {
          retorno = 'Error con el formato del apellido.';
        }
        break;

      case 'DNIValidado':
        if (this.DNIGrupoValidador.controls.DNIValidado.hasError('required')) {
          retorno = 'Debe ingresar un DNI.';
        }
        if (this.DNIGrupoValidador.controls.DNIValidado.hasError('pattern')) {
          retorno = 'Error con el formato del DNI.';
        }
        break;

      case 'numeroValidado':
        if (this.contactoGrupoValidador.controls.numeroValidado.hasError('required')) {
          retorno = 'Debe ingresar un numero.';
        }
        if (this.contactoGrupoValidador.controls.numeroValidado.hasError('pattern')) {
          retorno = 'Error con el formato del numero.';
        }
        break;

      case 'correoValidado':
        if (this.contactoGrupoValidador.controls.correoValidado.hasError('required')) {
          retorno = 'Debe ingresar un email.';
        }
        if (this.contactoGrupoValidador.controls.correoValidado.hasError('email')) {
          retorno = 'Debe ingresar un email válido.';
        }
        break;

      case 'contraseniaValidada':
        if (this.contraseniaGrupoValidador.controls.contraseniaValidada.hasError('required')) {
          retorno = 'Debe ingresar una contraseña';
        }
        if (this.contraseniaGrupoValidador.controls.contraseniaValidada.hasError('minLength')) {
          retorno = 'Debe ingresar una contraseña mayor a 6 caracteres';
        }
        break;
    }
    return retorno;
  }

  registrarUsuarioBD() {
    if (this.usuarioJSON.contrasenia == this.usuarioJSON.repetirContrasenia) {
      if (this.seEligioImagen == true) {
        var storageRef = this.st.storage.ref();
        let referencia = `usuarios/${this.preimagen.name}`;
        var uploadTask = storageRef.child(referencia).put(this.preimagen).then(element => {
          this.st.storage.ref(referencia).getDownloadURL().then((link) => {
            this.usuarioJSON.foto = link;
            this.dataBase.crear('usuarios', this.usuarioJSON)
              .then(resultado => {
                this.authService.register(this.usuarioJSON.correo, this.usuarioJSON.contrasenia)
                  .catch(err => alert("INCORRECTO"))
              })
          })
        });
      }

      else {
        this.dataBase.crear('usuarios', this.usuarioJSON)
          .then(resultado => {
            this.authService.register(this.usuarioJSON.correo, this.usuarioJSON.contrasenia)
              .catch(err => alert("INCORRECTO"))
          })
      }
    }

    else {
      alert("Las contraseñas no coinciden.")
    }
  }

}
