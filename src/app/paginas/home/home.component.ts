import { AfterViewInit, Component, OnChanges, OnInit, EventEmitter, Output } from '@angular/core';

// FIRESTORE
import { AngularFirestore } from "@angular/fire/firestore";
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import jwt_decode from "jwt-decode"; // ESTO LO OBTENGO CON npm i jwt-decode
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

  //test
  esDorso;
  datosTarjetaTest = {
    fechaVto: "00-00",
    nombre: "",
    apellido: "",
    tipoSaldo: "Credito",
    saldoEnCuotas: 75000,
    saldoDisponibleEnCuotas: 250000,
    saldoContado: 35000,
    saldoDisponibleContado: 15000,
    tipoTarjeta: "",
    numeroDeTarjetaArray: [
      ["0", "0", "0", "0"],
      ["0", "0", "0", "0"],
      ["0", "0", "0", "0"],
      ["0", "0", "0", "0"]
    ],
    pin: "401"
  }
  creditNumberMask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  dateMask = [/\d/, /\d/, '/', /\d/, /\d/];
  pinMask = [/\d/, /\d/, /\d/];


  //obtenerUsuario


  //fin test

  values = '';

  userIsLogged;
  tokenUsuario;
  payloadUsuario;
  emailUsuario;

  mostrarFormLogin = false;
  // HARDCODEADO PARA VER EL TIPO DE USUARIO
  tipoUsuario = 'administrador';

  constructor(private firestore: AngularFirestore, private authService: AuthService,
    private _formBuilder: FormBuilder,
  ) { }

  convertirStringEn4ArraysDeChars(textoIngresado) {
    let auxNumeroDeTarjetaArray = [];
    textoIngresado.split('-').forEach(stringDigito => {
      let fragmento4digitos = [];
      for (let i = 0; i < 4; i++) {
        fragmento4digitos.push(stringDigito[i]);
      }
      auxNumeroDeTarjetaArray.push(fragmento4digitos);
    });
    return auxNumeroDeTarjetaArray;
  }



  onChangeFechaVto(event: KeyboardEvent) {
    let textoIngresado = (event.target as HTMLInputElement).value;
    if (textoIngresado == '')
      textoIngresado = "00/00";
    this.datosTarjetaTest.fechaVto = textoIngresado;

  }
  onChangePin(event: KeyboardEvent) {
    let textoIngresado = (event.target as HTMLInputElement).value;
    if (textoIngresado == '')
      textoIngresado = "000";
    this.datosTarjetaTest.pin = textoIngresado;

  }
  onChangeNumTarjeta(event: KeyboardEvent) { // with type info
    let textoIngresado = (event.target as HTMLInputElement).value;
    if (textoIngresado == '')
      textoIngresado = "0000-0000-0000-0000";
    this.datosTarjetaTest.numeroDeTarjetaArray = this.convertirStringEn4ArraysDeChars(textoIngresado);

    this.obtenerTipoDeTarjeta(this.datosTarjetaTest.numeroDeTarjetaArray[0][0])

  }
  onChangeNombre(event: KeyboardEvent) {
    let textoIngresado = (event.target as HTMLInputElement).value;
    this.datosTarjetaTest.nombre = textoIngresado;
  }
  onChangeApelldio(event: KeyboardEvent) {
    let textoIngresado = (event.target as HTMLInputElement).value;
    this.datosTarjetaTest.apellido = textoIngresado;
  }



  obtenerTipoDeTarjeta(primerDijito) {
    switch (primerDijito) {
      case '4':
        this.datosTarjetaTest.tipoTarjeta = "Visa";
        break;
      case '2':
      case '5':
        this.datosTarjetaTest.tipoTarjeta = "MasterCard";
        break;
      default:
        this.datosTarjetaTest.tipoTarjeta = "";
        break;
    }
  }
  ngOnInit(): void {
  }
  ngOnChanges() {
    this.userIsLogged = this.authService.isLogged;
    alert("ENTRA");
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

}
