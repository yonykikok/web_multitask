import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


// REGISTRO FORMBUILDER.
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/servicios/database.service';


// FIRESTORE
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastService } from 'src/app/servicios/toast.service';




@Component({
  selector: 'app-dialog-modificar-datos',
  templateUrl: './dialog-modificar-datos.component.html',
  styleUrls: ['./dialog-modificar-datos.component.css']
})
export class DialogModificarDatosComponent implements OnInit {


   // VARIABLES PARA MODIFICAR DATOS CON FORM BUILDER. 

   nuevosDatosForm: FormGroup;

   nuevosDatosJSON = {
     nombre: "",
     apellido: "",
     DNI:"",
   };

   mostrarSpinner = false;


  // con esto, injecto la data en data.
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  private formBuilder: FormBuilder, 
  private dataBase: DatabaseService, 
  private firestore : AngularFirestore,
  private toast : ToastService) { 

    this.nuevosDatosForm = this.formBuilder.group({

      nombreValidado: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]{4,20}$')]],

      apellidoValidado: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]{4,20}$')]],

      DNIValidado: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],

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

        
        case 'DNIValidado':

          if (this.nuevosDatosForm.controls.DNIValidado.hasError('required')) 
          {
            retorno = 'Debe ingresar un DNI.';
          } 
          
          if (this.nuevosDatosForm.controls.DNIValidado.hasError('pattern')) 
          {
            retorno = 'Error con el formato del DNI.';
          }
          
      break;

    }

    return retorno;
  }




  ngOnInit(): void {

      this.nuevosDatosJSON.nombre = this.data.nombre;
      this.nuevosDatosJSON.apellido = this.data.apellido;
      this.nuevosDatosJSON.DNI = this.data.DNI;

  }


  actualizarDatos(){

    {
      let auxDatosDePersona = null;
  
      this.firestore.collection("usuarios").get().subscribe((querySnapShot) => {
        querySnapShot.forEach((doc) => {
  
          // recorro toda la bd para que busque el email. 
          if(doc.data()['correo'] === this.data.correo)
          {
            auxDatosDePersona = doc.data();
  
            auxDatosDePersona.nombre = this.nuevosDatosJSON.nombre;
            auxDatosDePersona.apellido = this.nuevosDatosJSON.apellido;

            this.dataBase.actualizar("usuarios", auxDatosDePersona, doc.id);
            this.toast.snackBarMensaje("Los cambios fueron realizados... Actualizando", "Aceptar", 3000);
          }
        })
      })

    }
    
  }



  probar()
  {
    console.log("lala");
  }

}
