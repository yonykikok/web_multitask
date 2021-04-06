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
  selector: 'app-realizar-consulta-anonima',
  templateUrl: './realizar-consulta-anonima.component.html',
  styleUrls: ['./realizar-consulta-anonima.component.css']
})
export class RealizarConsultaAnonimaComponent implements OnInit {


  consultaForm: FormGroup;


  consultaJSON = {
    nombre : "",
    apellido: "",
    correo: "",
    consulta:"",
    horaConsulta:"",
    estadoConsulta:"sinResponder"
  };

  
  constructor(private formBuilder: FormBuilder,

    private dataBase : DatabaseService,
    private st : AngularFireStorage,
    
    ) {

    this.consultaForm = this.formBuilder.group({

      nombreValidado: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]{4,20}$')]],

      apellidoValidado: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]{4,20}$')]],

      correoValidado: ['', [Validators.required, Validators.email]],

      consultaValidada: ['', [Validators.required, Validators.minLength(30)]],

   });
  
 }

  ngOnInit(): void {

  }


  public mostrarErrorRegistro(control: string): string {

    let retorno = '';

    switch (control) {

      case 'nombreValidado':

            if (this.consultaForm.controls.nombreValidado.hasError('required')) 
            {
              retorno = 'Debe ingresar un nombre.';
            } 
            
            if (this.consultaForm.controls.nombreValidado.hasError('minLength')) 
            {
              retorno = 'Debe ingresar un nombre válido.';
            }
            
            if (this.consultaForm.controls.nombreValidado.hasError('pattern')) 
            {
              retorno = 'Error con el formato del nombre.';
            }

        break;
    
        case 'apellidoValidado':

            if (this.consultaForm.controls.apellidoValidado.hasError('required')) 
            {
              retorno = 'Debe ingresar un apellido.';
            } 
            
            if (this.consultaForm.controls.apellidoValidado.hasError('minLength')) 
            {
              retorno = 'Debe ingresar un apellido válido.';
            }
            
            if (this.consultaForm.controls.apellidoValidado.hasError('pattern')) 
            {
              retorno = 'Error con el formato del apellido.';
            }
  
        break;


        case 'correoValidado':

            if (this.consultaForm.controls.correoValidado.hasError('required')) 
            {
              retorno = 'Debe ingresar un email.';
            } 
            
            if (this.consultaForm.controls.correoValidado.hasError('email')) 
            {
              retorno = 'Debe ingresar un email válido.';
            }

        break;


        case 'consultaValidada':

            if (this.consultaForm.controls.consultaValidada.hasError('required')) 
            {
              retorno = 'Debe ingresar una consulta';
            } 
            
            if (this.consultaForm.controls.consultaValidada.hasError('minLength')) 
            {
              retorno = 'Debe ingresar una consulta mayor a 30 caracteres';
            }

        break;

    }

    return retorno;
  }



  registrarConsultasAnonimasBD()
  {
    this.consultaJSON.horaConsulta = new Date().toLocaleString() 
    this.dataBase.crear('consultasAnonimas',this.consultaJSON)
  
    .then(resultado => { console.log("Consulta enviada con éxito") ; this.vaciarCampos()});
  }


  vaciarCampos()
  {
    this.consultaJSON.nombre ="";
    this.consultaJSON.apellido ="";
    this.consultaJSON.correo ="";
    this.consultaJSON.consulta ="";
  }


}
