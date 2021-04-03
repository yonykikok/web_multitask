import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/clases/producto/producto';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';
import {InfoCompartidaService} from 'src/app/servicios/info-compartida.service';
import { StorageService } from 'src/app/shared/upload-image/storage.service';
@Component({
  selector: 'app-form-alta-producto',
  templateUrl: './form-alta-producto.component.html',
  styleUrls: ['./form-alta-producto.component.css']
})
export class FormAltaProductoComponent implements OnInit {

  mostrarTextAreaDeGarantia=false;
  imagenesSeleccionadas=false;
  
  isLinear = false;
  tituloFormGroup: FormGroup;
  estadoFormGroup: FormGroup;
  descripcionFormGroup: FormGroup;
  fotosFormGroup: FormGroup;
  precioFormGroup: FormGroup;
  garantiaFormGroup: FormGroup;
  hayImagenesSeleccionadas$: Observable<boolean>;
  imagenSeleccionada=false;
  user: Usuario;
  currentUser$: Observable<Usuario>;
 
 

  constructor(private _formBuilder: FormBuilder,
    private readonly storageService:StorageService,
    private authService:AuthService,
    private dataBase:DatabaseService) {}

  ngOnInit() {
    this.hayImagenesSeleccionadas$ = InfoCompartidaService.obtenerSiHayImagenesSeleccionadas$();
    this.hayImagenesSeleccionadas$.subscribe(hayImagen => {
      this.imagenSeleccionada = hayImagen;     
    });
    
    this.currentUser$ = this.authService.obtenerUsuario$();
    this.currentUser$.subscribe(usuarios => {
      this.user = usuarios;
    });
    this.authService.actualizarUsuario();

    this.hayImagenesSeleccionadas$.subscribe(hayImagen => {
      this.imagenSeleccionada = hayImagen;     
    });

    this.tituloFormGroup = this._formBuilder.group({
      tituloControl: ['', Validators.required]
    });
    this.estadoFormGroup = this._formBuilder.group({
      estadoControl: ['', Validators.required]
    })
    this.descripcionFormGroup = this._formBuilder.group({
      descripcionControl: ['', Validators.required]
    });
    this.fotosFormGroup = this._formBuilder.group({
      fotosControl: ['']
    });
    this.precioFormGroup = this._formBuilder.group({
      precioControl: ['', Validators.required]
    });
    this.garantiaFormGroup = this._formBuilder.group({
      garantiaControl: ['', Validators.required],
      textAreaControl:['']
    });
    this.imagenesSeleccionadas=InfoCompartidaService.imagenesSeleccionadas;
  }

  cambiarEstadoGarantia(garantia){
    garantia=='conGarantia'?this.mostrarTextAreaDeGarantia=true:this.mostrarTextAreaDeGarantia=false;
  }


  publicarProducto(){    
   
   let publicacion={
      titulo:this.tituloFormGroup.controls['tituloControl'].value,
      estado:this.estadoFormGroup.controls['estadoControl'].value,
      descripcion:this.descripcionFormGroup.controls['descripcionControl'].value,
      fotos:this.fotosFormGroup.controls['fotosControl'].value,
      precio:this.precioFormGroup.controls['precioControl'].value,
      garantia:this.garantiaFormGroup.controls['garantiaControl'].value    
    }
    if(publicacion.garantia){
      publicacion['detalleGarantia']=this.garantiaFormGroup.controls['textAreaControl'].value;
     }
     publicacion['idUserQuePublico']=this.user['id'];
     //falta linkear el id del usuario que publica
     this.subirImagenesAlStorage(publicacion);
    
  }
     subirImagenesAlStorage(publicacion){
       this.storageService.uploadImage(StorageService.filesDropped);
       setTimeout(() => {
        publicacion.fotos=StorageService.arrayImagenes;
         this.dataBase.crear('publicaciones',publicacion).then((res)=>{
         });
       }, 5000);
  
  }

}
