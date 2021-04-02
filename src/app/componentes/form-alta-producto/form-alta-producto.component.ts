import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-form-alta-producto',
  templateUrl: './form-alta-producto.component.html',
  styleUrls: ['./form-alta-producto.component.css']
})
export class FormAltaProductoComponent implements OnInit {

mostrarTextAreaDeGarantia=false;
  /**
   * titulo
   * condicion  
   * precio
   * fotos
  */
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  cambiarEstado(garantia){
    garantia=='conGarantia'?this.mostrarTextAreaDeGarantia=true:this.mostrarTextAreaDeGarantia=false;
  }
}
