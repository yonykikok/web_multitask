import { AfterViewInit, Component, ElementRef, Inject, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HomeComponent } from 'src/app/paginas/home/home.component';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';
import { ToastService } from 'src/app/servicios/toast.service';
@Component({
  selector: 'app-formulario-de-pago',
  templateUrl: './formulario-de-pago.component.html',
  styleUrls: ['./formulario-de-pago.component.css']
})
export class FormularioDePagoComponent implements OnInit {
  //test
  step = 1;
  mostrarDialogConfirmacion = false;
  compra = {
    tipoSaldo: "",
    cantidadDeCuotas: 1,
    precioPorCuota: 0,
    precioEnCuotas: 0,

  };
  mostrarFormularioCuotas = false;
  publicacionObjetivo;
  tarjetas = [];
  testGroupTarjetaForm: FormGroup
  yoQuiero = false;
  esDorso;
  @Input() datosTarjetaTest = {
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
  creditNumberMask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  dateMask = [/\d/, /\d/, '/', /\d/, /\d/];
  pinMask = [/\d/, /\d/, /\d/];



  //obtenerUsuario

  //fin tes
  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<FormularioDePagoComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private _formBuilder: FormBuilder, private dataBase: DatabaseService,
    private firestore: AngularFirestore,
    private toast: ToastService
  ) {
    // pasar esto tambien, de la tarjeta.
    this.publicacionObjetivo = { ...data.publicacion };

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
    this.compra['producto'] = { ...this.publicacionObjetivo };

    this.firestore.collection("tarjetas").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        //if (doc.data()['tipo'] != tipoUsuario) 
        let tarjeta = doc.data();
        tarjeta['id'] = doc.id;
        this.tarjetas.push(tarjeta);
      })
    })
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
    this.obtenerTipoDeTarjeta(this.datosTarjetaTest.numeroDeTarjetaArray[0][0])

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
  // [0-9]{4}[-]{1}[0-9]{4}[-]{1}[0-9]{4}[-]{1}[0-9]{4}
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

  calcularCuotas() {
    let select: HTMLElement = document.getElementById("cuotas");
    this.compra['cantidadDeCuotas'] = select['value'];

    switch (select['value']) {
      case '3':
        this.compra['precioEnCuotas'] = this.publicacionObjetivo.precio;
        break;
      case '6':
        this.compra['precioEnCuotas'] = this.publicacionObjetivo.precio * 1.20;
        break;
      case '12':
        this.compra['precioEnCuotas'] = this.publicacionObjetivo.precio * 1.45;
        break;
      case '18':
        this.compra['precioEnCuotas'] = this.publicacionObjetivo.precio * 1.95;
        break;
    }
    this.compra['precioPorCuota'] = (this.compra['precioEnCuotas'] / this.compra['cantidadDeCuotas']);

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
    console.log(this.compra);
    this.mostrarDialogConfirmacion = true
  }

  efectuarCompra() {

    this.mostrarDialogConfirmacion = false;
    //Spinner ON
    this.compra['idComprador'] = this.authService.user['id'];
    this.compra['idVendedor'] = this.publicacionObjetivo.idUserQuePublico;
    console.log("Compra!", this.compra);


    // this.dataBase.crear('compras', this.compra);
    //estado="vendido"
    // this.dataBase.actualizar('publicaciones',publicacionConCambioDeEstado,idpublicacion);

  }
  procesarInformacionDePago() {
    this.step = 2;
    if (this.esUnaTarjetaRegistrada()) {
      let fechaActual = new Date();
      this.compra['tipoTarjeta'] = this.datosTarjetaTest.tipoTarjeta;
      this.compra['tipoSaldo'] = this.datosTarjetaTest.tipoSaldo;
      this.compra['fechaCompra'] = fechaActual;
      this.compra['precioEnCuotas'] = this.publicacionObjetivo.precio;
      this.compra['cantidadDeCuotas'] = 1;


      let arrayFechaTarjeta = this.datosTarjetaTest.fechaVto.split('/');
      let fechaTarjeta = new Date(arrayFechaTarjeta[0] + "-01-" + arrayFechaTarjeta[1]);

      if (fechaActual > fechaTarjeta) {
        alert("tarjeta vencida");

        /*
        snackWarning
        snackSuccess
        snackPrimary
        snackDanger*/
        this.toast.snackBarEditable("Esta tarjeta esta vencida!", "Cerrar", 3000, "snackWarning");
        return;
      }

      switch (this.datosTarjetaTest.tipoSaldo) {
        case "Credito":
          //mostrarFormularioDeCuotas
          this.publicacionObjetivo["precioEnCuotas"] = this.publicacionObjetivo.precio;
          this.mostrarFormularioCuotas = true;

          break;
        case "Debito":
          if (this.datosTarjetaTest.saldoContado >= this.publicacionObjetivo.precio) {
            this.mostrarDialog();
          }
          else {
            alert("Monto insuficiente");
          }
          break;
      }


    } else {
      alert("tarjeta NO registrada");
    }

  }


  detenerPropagacion(e) {
    e.stopPropagation();
  }
}
