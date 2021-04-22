import { Component, OnInit } from '@angular/core';


// FIREBASE:
import * as firebase from 'firebase'
// FIREBASE STORAGE
import {AngularFireStorage} from "@angular/fire/storage"
// REGISTRO FORMBUILDER.
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// SERVICIO DATABASE.
import { DatabaseService } from "../../servicios/database.service"

@Component({
  selector: 'app-generar-reparacion',
  templateUrl: './generar-reparacion.component.html',
  styleUrls: ['./generar-reparacion.component.css']
})
export class GenerarReparacionComponent implements OnInit {

  consultaForm: FormGroup;


  reparacionJSON = {
    fecha : new Date().toLocaleDateString(),
    nombre : "",
    apellido: "",
    correo: "",
    telefono:"",
    marcaYModelo:"",
    observaciones:"",
    trabajoARealizar:"",
    precio:"",
    sena:""
  };

  
  constructor(private formBuilder: FormBuilder,

    private dataBase : DatabaseService,
    private st : AngularFireStorage,
    
    ) {

    this.consultaForm = this.formBuilder.group({

      nombreValidado: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]{4,20}$')]],

      apellidoValidado: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]{4,20}$')]],

      correoValidado: ['', [Validators.required, Validators.email]],

      telefonoValidado: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],

      marcaYModeloValidado: ['', [Validators.required]],

      observacionesValidado: ['', [Validators.required, Validators.minLength(1)]],

      trabajoARealizarValidado: ['', [Validators.required, Validators.minLength(1)]],

      precioValidado: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],

      señaValidada: ['', [Validators.pattern('^[0-9]{10}$')]],



   });
  
 }

  ngOnInit(): void {

  }



  registrarReparacionBD()
  {

    this.dataBase.crear('reparaciones',this.reparacionJSON)
  
    .then(resultado => 
      { console.log("Consulta enviada con éxito") ; this.vaciarCampos()});
  }


  vaciarCampos()
  {
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
