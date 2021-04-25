import { Component, OnInit } from '@angular/core';


// ANGULAR FIRESTORE.
import { AngularFirestore } from '@angular/fire/firestore';
// FIREBASE:
import * as firebase from 'firebase'
// FIREBASE STORAGE
import { AngularFireStorage } from "@angular/fire/storage"
// REGISTRO FORMBUILDER.
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// SERVICIO DATABASE.
import { DatabaseService } from "../../servicios/database.service"
import { ToastService } from 'src/app/servicios/toast.service';

@Component({
  selector: 'app-generar-reparacion',
  templateUrl: './generar-reparacion.component.html',
  styleUrls: ['./generar-reparacion.component.css']
})
export class GenerarReparacionComponent implements OnInit {

  consultaForm: FormGroup;
  DNIExiste;
  numeroFactura : number;


  reparacionJSON = {
    idUsuario:"",
    fecha: new Date().toLocaleDateString(),
    DNI: "",
    nombre: "",
    apellido: "",
    correo: "",
    telefono:"",
    marcaYModelo:"",
    observaciones:"",
    trabajoARealizar:"",
    tipoDispositivo:"",
    precio:"",
    sena:"",
    estado:"enProceso"
  };


  constructor(private formBuilder: FormBuilder,

    private dataBase : DatabaseService,
    private st : AngularFireStorage,
    private firestore : AngularFirestore,
    private toast : ToastService,

    ) {

    this.DNIExiste = false;

    this.consultaForm = this.formBuilder.group({

      DNIValidado: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],

      nombreValidado: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]{4,20}$')]],

      apellidoValidado: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]{4,20}$')]],

      correoValidado: ['', [Validators.required, Validators.email]],

      telefonoValidado: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],

      marcaYModeloValidado: ['', [Validators.required]],

      observacionesValidado: ['', [Validators.required, Validators.minLength(1)]],

      trabajoARealizarValidado: ['', [Validators.required, Validators.minLength(1)]],

      precioValidado: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],

      senaValidada: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],



    });

  }

  ngOnInit(): void {

  }


  VerificarExistenciaUsuario()
  {
    this.firestore.collection("usuarios").get().subscribe((querySnapShot) => { querySnapShot.forEach((doc) => {
      
      if(doc.data()['DNI'] == this.reparacionJSON.DNI && doc.data()['tipo'] == 'cliente')
      {
       this.toast.snackBarMensaje("El DNI existe. La factura podrá ser generada.", "Aceptar", 3000);
       this.reparacionJSON.nombre = doc.data()['nombre'];
       this.reparacionJSON.apellido = doc.data()['apellido'];
       this.reparacionJSON.correo = doc.data()['correo'];
       this.reparacionJSON.telefono = doc.data()['numero'];
       this.reparacionJSON.idUsuario = doc.id;
       this.DNIExiste=true;
      }
  
      })
    })
  }



  registrarReparacionBD() 
    {
    this.dataBase.crear('reparaciones',this.reparacionJSON)
  
    .then(resultado => 
    { 
      this.toast.snackBarMensaje("La factura de ha generado con éxito!", "Aceptar", 3000);
      this.vaciarCampos();
    }
    );
  }




  vaciarCampos()
  {
    this.reparacionJSON.DNI ="";
    this.reparacionJSON.nombre ="";
    this.reparacionJSON.apellido ="";
    this.reparacionJSON.correo ="";
    this.reparacionJSON.telefono ="";
    this.reparacionJSON.marcaYModelo ="";
    this.reparacionJSON.observaciones ="";    
    this.reparacionJSON.trabajoARealizar ="";
    this.reparacionJSON.precio ="";
    this.reparacionJSON.sena ="";
  }


}
