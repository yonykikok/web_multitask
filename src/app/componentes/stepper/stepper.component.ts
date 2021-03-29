import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {
  isLinear = true;
  formGroupSeleccionEquipo: FormGroup;
  formGroupSeleccionServicio: FormGroup;
  formGroupDatosCliente:FormGroup;
  formGroupDatosEquipo:FormGroup;
  formGroupTrabajoARealizar:FormGroup;
  formGroupObservaciones:FormGroup;
  animalControl:FormGroup;

  
  marcasDeEquipos=["LG","Motorola","Samsung","Huawei","Xiaomi","Apple","Otro"];
  observaciones=[];
 
  constructor(private _formBuilder: FormBuilder) {
    
    this.formGroupSeleccionEquipo = new FormGroup({
      opcionesTipoDeEquipo: new FormControl('', Validators.required)     
      
    });

    this.formGroupObservaciones = new FormGroup({
      observaciones:new FormControl('',Validators.required),
   });  
   this.formGroupDatosEquipo = new FormGroup({
     modelo:new FormControl(),
  });
   this.formGroupDatosCliente = new FormGroup({
     nombre:new FormControl(),
     apellido:new FormControl(),
     dni:new FormControl(),
     telefono:new FormControl()
  });
  }



  ngOnInit() {
    // this.formGroupSeleccionEquipo = this._formBuilder.group({
    //   opcionesTipoDeEquipo:['', Validators.required]
      
      
    // });
    this.formGroupSeleccionServicio = this._formBuilder.group({
      opcionesTipoDeServicio: ['', Validators.required]
    });
  
  }
  

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.observaciones.push( value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: string): void {
    const index = this.observaciones.indexOf(fruit);

    if (index >= 0) {
      this.observaciones.splice(index, 1);
    }
  }
}
