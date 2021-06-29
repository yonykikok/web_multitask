import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/servicios/database.service';
import { ToastService } from 'src/app/servicios/toast.service';

@Component({
  selector: 'app-form-pago-reparacion',
  templateUrl: './form-pago-reparacion.component.html',
  styleUrls: ['./form-pago-reparacion.component.css']
})
export class FormPagoReparacionComponent implements OnInit {
  @Input() reparacion;
  pago = {
    tipoSaldo: "",
    cantidadDeCuotas: 1,
    precioPorCuota: 0,
    precioEnCuotas: 0,
    tipoTarjeta: "",
    fechaPago: null
  };
  mostrarDialogConfirmacion = false;
  creditNumberMask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  dateMask = [/\d/, /\d/, '/', /\d/, /\d/];
  pinMask = [/\d/, /\d/, /\d/];
  mostrarSpinner = false;
  step = 1;
  mostrarFormularioCuotas = false;
  @Output() cancelarEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  groupTarjetaForm: FormGroup;
  esDorso = false;
  tarjetas = [];
  datosTarjetaTest = {
    fechaVto: "00-00",
    nombre: "",
    apellido: "",
    tipoSaldo: "",
    saldoEnCuotas: 0,
    saldoDisponibleEnCuotas: 0,
    saldoContado: 0,
    saldoDisponibleContado: 0,
    tipoTarjeta: "",
    numeroDeTarjetaArray: [
      ["0", "0", "0", "0"],
      ["0", "0", "0", "0"],
      ["0", "0", "0", "0"],
      ["0", "0", "0", "0"]
    ],
    numeroDeTarjetaString: "0000-0000-0000-0000",
    pin: "000"
  }

  constructor(
    private firestore: AngularFirestore,
    private _formBuilder: FormBuilder,
    private toast: ToastService,
    private dataBase: DatabaseService
  ) {
    this.groupTarjetaForm = this._formBuilder.group({

      //numeroValidado: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('^[0-9-_]{16}$')]],

      numeroValidado: ['', [Validators.required]],

      pinValidado: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],

      nombreValidado: ['', [Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z ]{4,20}$')]],

      apellidoValidado: ['', [Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z ]{4,20}$')]],

      fechaValidada: ['', [Validators.required]],


    });
  }
  ngOnInit(): void {
    this.firestore.collection("tarjetas").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        //if (doc.data()['tipo'] != tipoUsuario) 
        let tarjeta = doc.data();
        tarjeta['id'] = doc.id;
        this.tarjetas.push(tarjeta);
      })
    })
  }


  cancelar() {
    this.cancelarEvent.emit();
  }

  detenerPropagacion(e) {
    e.stopPropagation();
  }

  onChangeFechaVto(event: KeyboardEvent) {
    let textoIngresado = (event.target as HTMLInputElement).value;
    if (textoIngresado == '')
      textoIngresado = "00/00";
    this.datosTarjetaTest.fechaVto = textoIngresado;

    this.step = 1;
  }
  onChangePin(event: KeyboardEvent) {
    let textoIngresado = (event.target as HTMLInputElement).value;
    if (textoIngresado == '')
      textoIngresado = "000";
    this.datosTarjetaTest.pin = textoIngresado;

    this.step = 1;
  }
  onChangeNumTarjeta(event: KeyboardEvent) { // with type info
    this.mostrarFormularioCuotas = false;
    let textoIngresado = (event.target as HTMLInputElement).value;
    if (textoIngresado == '') {
      textoIngresado = "0000-0000-0000-0000";
    }
    this.datosTarjetaTest.numeroDeTarjetaString = textoIngresado;
    this.datosTarjetaTest.numeroDeTarjetaArray = this.convertirStringEn4ArraysDeChars(textoIngresado);
    this.obtenerTipoDeTarjeta(this.datosTarjetaTest.numeroDeTarjetaArray[0][0]);

    this.step = 1;
  }
  onChangeNombre(event: KeyboardEvent) {
    let textoIngresado = (event.target as HTMLInputElement).value;
    let cantidadCaracteresApellido = this.datosTarjetaTest.nombre.length;
    if (cantidadCaracteresApellido + (event.target as HTMLInputElement).value.length <= 26) {
      this.datosTarjetaTest.nombre = textoIngresado;
    }
    this.step = 1;
  }
  onChangeApelldio(event: KeyboardEvent) {
    let textoIngresado = (event.target as HTMLInputElement).value;
    let cantidadCaracteresNombre = this.datosTarjetaTest.nombre.length;
    if (cantidadCaracteresNombre + (event.target as HTMLInputElement).value.length <= 26) {
      this.datosTarjetaTest.apellido = textoIngresado;
    }

    this.step = 1;
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


  esUnaTarjetaRegistrada(): boolean {
    let retorno = false;
    this.tarjetas.forEach(tarjeta => {
      if (
        this.datosTarjetaTest.numeroDeTarjetaString === tarjeta.numeroDeTarjetaString &&
        this.datosTarjetaTest.pin === tarjeta.pin &&
        this.datosTarjetaTest.fechaVto === tarjeta.fechaVto &&
        tarjeta.nombre.toLocaleLowerCase().includes(this.datosTarjetaTest.nombre.toLocaleLowerCase()) &&
        tarjeta.apellido.toLocaleLowerCase().includes(this.datosTarjetaTest.apellido.toLocaleLowerCase())
      ) {
        this.datosTarjetaTest = { ...tarjeta };
        retorno = true;
      }
    });
    return retorno;
  }

  mostrarDialog() {
    this.mostrarDialogConfirmacion = true
  }
  procesarInformacionDePago() {
    if (this.esUnaTarjetaRegistrada()) {
      let fechaActual = new Date();
      this.pago['tipoTarjeta'] = this.datosTarjetaTest.tipoTarjeta;
      this.pago['tipoSaldo'] = this.datosTarjetaTest.tipoSaldo;
      this.pago['fechaPago'] = fechaActual;

      if (this.pago['cantidadDeCuotas'] == 1) {
        this.pago['precioEnCuotas'] = (this.reparacion.precio - this.reparacion.sena);
      }


      let arrayFechaTarjeta = this.datosTarjetaTest.fechaVto.split('/');
      let fechaTarjeta = new Date(arrayFechaTarjeta[0] + "-01-" + arrayFechaTarjeta[1]);

      if (fechaActual > fechaTarjeta) {
        this.toast.snackBarEditable("Esta tarjeta esta vencida!", "Cerrar", 3000, "snackWarning");
        return;
      }
      switch (this.datosTarjetaTest.tipoSaldo) {
        case "Credito":
          this.mostrarFormularioCuotas = true
          setTimeout(() => {
            this.calcularCuotas();
          }, 200);
          //  this.mostrarDialog();

          break;
        case "Debito":
          if (this.datosTarjetaTest.saldoContado >= (this.reparacion.precio - this.reparacion.sena)) {
            this.step = 2;
            this.mostrarDialog();
          }
          else {
            this.toast.snackBarEditable("Monto insuficiente para esta pago", "Cerrar", 3000, "snackWarning");
          }
          break;
      }


    } else {
      this.toast.snackBarEditable("Tarjeta no registrada!", "Cerrar", 3000, "snackDanger");
    }
    console.log(this.pago);
  }


  calcularCuotas() {
    let select: HTMLElement = document.getElementById("cuotas");
    this.pago['cantidadDeCuotas'] = select['value'];
    this.step = 2;

    switch (select['value']) {
      case '1':
        this.pago['precioEnCuotas'] = (this.reparacion.precio - this.reparacion.sena);
        break;
      case '3':
        this.pago['precioEnCuotas'] = (this.reparacion.precio - this.reparacion.sena);
        break;
      case '6':
        this.pago['precioEnCuotas'] = (this.reparacion.precio - this.reparacion.sena) * 1.20;
        break;
      case '12':
        this.pago['precioEnCuotas'] = (this.reparacion.precio - this.reparacion.sena) * 1.45;
        break;
      case '18':
        this.pago['precioEnCuotas'] = (this.reparacion.precio - this.reparacion.sena) * 1.95;
        break;
    }
    this.pago['precioPorCuota'] = (this.pago['precioEnCuotas'] / this.pago['cantidadDeCuotas']);

  }



  efectuarPago() {

    //LAS COMPRAS LAS DIFERENCIAMOS CON 'TIPOSALDO' SIENDO CREDITO O DEBITO
    this.mostrarDialogConfirmacion = false;


    let tarjeta = { ...this.datosTarjetaTest }
    this.mostrarSpinner = true;
    //Spinner ON

    this.datosTarjetaTest.saldoContado = (tarjeta.saldoContado - (this.reparacion.precio - this.reparacion.sena));

    this.reparacion['estado'] = "pagado";
    this.reparacion['infoDePago'] = this.pago;
    this.dataBase.actualizar('reparaciones', this.reparacion, this.reparacion.id)
      .then(() => {
        return this.dataBase.actualizar('tarjetas', this.datosTarjetaTest, this.datosTarjetaTest['id']);
      }).then(() => {
        this.toast.snackBarEditable("Pago realizada con exito", "Cerrar", 3000, "snackSuccess");
        this.mostrarSpinner = false;
        this.cancelarEvent.emit();
        this.reiniciarDatosPago();
      })
      .catch(err => {
        this.toast.snackBarEditable("ERROR, al efectuar el pago de la reparacion ( " + err.message() + " )", "Cerrar", 3000, "snackDanger");
      });

  }


  reiniciarDatosPago() {
    this.pago = {
      tipoSaldo: "",
      cantidadDeCuotas: 1,
      precioPorCuota: 0,
      precioEnCuotas: 0,
      tipoTarjeta: "",
      fechaPago: null
    }

  }

}
