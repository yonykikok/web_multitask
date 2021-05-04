import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HomeComponent } from 'src/app/paginas/home/home.component';
@Component({
  selector: 'app-formulario-de-pago',
  templateUrl: './formulario-de-pago.component.html',
  styleUrls: ['./formulario-de-pago.component.css']
})
export class FormularioDePagoComponent implements OnInit {
  //test


  testGroupTarjetaForm: FormGroup
  yoQuiero = false;
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
  constructor(
    private _formBuilder: FormBuilder,) {
    // pasar esto tambien, de la tarjeta.

    this.testGroupTarjetaForm = this._formBuilder.group({

      //numeroValidado: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('^[0-9-_]{16}$')]],

      numeroValidado: ['', [Validators.required]],

      pinValidado: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],

      nombreValidado: ['', [Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z ]{4,20}$')]],

      apellidoValidado: ['', [Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z ]{4,20}$')]],

      fechaValidada: ['', [Validators.required]],


    });
  }

  ngOnInit() {

  }




  public mostrarErrorRegistro(control: string): string {

    let retorno = '';
    switch (control) {

      case 'numeroValidado':

        if (this.testGroupTarjetaForm.controls.numeroValidado.hasError('required')) {
          retorno = 'Debe ingresar un numero.';
        }


        if (this.testGroupTarjetaForm.controls.numeroValidado.hasError('pattern')) {
          retorno = 'Error con el formato del numero.';
        }

        if (this.testGroupTarjetaForm.controls.numeroValidado.hasError('minLength')) {
          retorno = 'El numero debe contener minimo 16 digitos.';
        }

        if (this.testGroupTarjetaForm.controls.numeroValidado.hasError('maxLength')) {
          retorno = 'El numero debe contener maximo 16 digitos.';
        }

        break;


      case 'pinValidado':

        if (this.testGroupTarjetaForm.controls.pinValidado.hasError('required')) {
          retorno = 'Debe ingresar un PIN.';
        }

        if (this.testGroupTarjetaForm.controls.pinValidado.hasError('minLength')) {
          retorno = 'El PIN debe contener minimo 16 digitos.';
        }

        if (this.testGroupTarjetaForm.controls.pinValidado.hasError('maxLength')) {
          retorno = 'El PIN debe contener maximo 16 digitos.';
        }

        break;


      case 'nombreValidado':

        if (this.testGroupTarjetaForm.controls.nombreValidado.hasError('required')) {
          retorno = 'Debe ingresar su nombre.';
        }

        if (this.testGroupTarjetaForm.controls.nombreValidado.hasError('pattern')) {
          retorno = 'Error con el formato del nombre.';
        }

        break;



      case 'apellidoValidado':

        if (this.testGroupTarjetaForm.controls.apellidoValidado.hasError('required')) {
          retorno = 'Debe ingresar su apellido';
        }

        if (this.testGroupTarjetaForm.controls.apellidoValidado.hasError('pattern')) {
          retorno = 'Error con el formato del apellido';
        }

        break;


      case 'fechaValidada':

        if (this.testGroupTarjetaForm.controls.fechaValidada.hasError('required')) {
          retorno = 'Debe ingresar la fecha de expiracion';
        }

        break;


    }

    return retorno;
  }






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
    if (textoIngresado == '') {
      textoIngresado = "0000-0000-0000-0000";
    }
    this.datosTarjetaTest.numeroDeTarjetaArray = this.convertirStringEn4ArraysDeChars(textoIngresado);

    this.obtenerTipoDeTarjeta(this.datosTarjetaTest.numeroDeTarjetaArray[0][0])



  }
  onChangeNombre(event: KeyboardEvent) {
    let textoIngresado = (event.target as HTMLInputElement).value;
    let cantidadCaracteresApellido = this.datosTarjetaTest.nombre.length;
    if (cantidadCaracteresApellido + (event.target as HTMLInputElement).value.length <= 26) {
      this.datosTarjetaTest.nombre = textoIngresado;
    }
  }
  onChangeApelldio(event: KeyboardEvent) {
    let textoIngresado = (event.target as HTMLInputElement).value;
    let cantidadCaracteresNombre = this.datosTarjetaTest.nombre.length;
    if (cantidadCaracteresNombre + (event.target as HTMLInputElement).value.length <= 26) {
      this.datosTarjetaTest.apellido = textoIngresado;
    }

  }



  obtenerTipoDeTarjeta(primerDijito) {
    switch (primerDijito) {
      case '4':
        this.datosTarjetaTest.tipoTarjeta = "Visa";
          this.yoQuiero = false;
          break;
      case '2':
      case '5':
          this.yoQuiero = false;
          this.datosTarjetaTest.tipoTarjeta = "MasterCard";
        break;
        default:
          this.datosTarjetaTest.tipoTarjeta = "";
          this.yoQuiero = true;
        break;
    }
  }


}
