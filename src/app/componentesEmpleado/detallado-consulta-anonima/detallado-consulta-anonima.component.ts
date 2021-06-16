import { Component, OnInit ,Input, Output,EventEmitter} from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-detallado-consulta-anonima',
  templateUrl: './detallado-consulta-anonima.component.html',
  styleUrls: ['./detallado-consulta-anonima.component.css']
})
export class DetalladoConsultaAnonimaComponent implements OnInit {

  @Input() consulta;
  @Output() cerrarFormularioEvent:EventEmitter<any>=new EventEmitter<any>();
  @Output() enviarRespuestaEvent:EventEmitter<any>=new EventEmitter<any>();
  respuestaForm;
  mostrarAnimacion=false;
  
  constructor(private formBuilder:FormBuilder) { 
    this.respuestaForm = this.formBuilder.group({
      respuestaValida: ['', [Validators.required]],

   });
  }

  ngOnInit(): void {
  }
  cerrarFormulario(){
    this.cerrarFormularioEvent.emit(this.consulta);
  }
  enviarRespuesta(){
    this.mostrarAnimacion=true;
    this.consulta['respuesta']=this.respuestaForm.controls.respuestaValida.value;
    // console.log(this.consulta);
    setTimeout(() => {
      this.enviarRespuestaEvent.emit(this.consulta);
    }, 4000);
  }
}
