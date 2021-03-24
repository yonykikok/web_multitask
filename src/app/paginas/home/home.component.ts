import { Component, OnChanges, OnInit } from '@angular/core';

// FIRESTORE
import {AngularFirestore} from "@angular/fire/firestore";

import jwt_decode from "jwt-decode"; // ESTO LO OBTENGO CON npm i jwt-decode
import { AuthService } from 'src/app/servicios/auth.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnChanges {

  userIsLogged;
  tokenUsuario;
  payloadUsuario;
  emailUsuario;

  mostrarFormLogin=false;
  // HARDCODEADO PARA VER EL TIPO DE USUARIO
  tipoUsuario = 'administrador';


  constructor(private firestore : AngularFirestore, private authService:AuthService) {
  
   }

  ngOnInit(): void {

    this.tokenUsuario = localStorage.getItem('token');
    this.payloadUsuario = jwt_decode(this.tokenUsuario);
    this.emailUsuario = this.payloadUsuario.email;

    this.buscarInfoLogueado();


  }
  ngOnChanges(){
    this.userIsLogged=this.authService.isLogged;
    alert("ENTRA");
  }

  buscarInfoLogueado(){

    this.firestore.collection('usuarios').get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {

        // Correo de la BD == Correo de la lista.

        /*
       if(doc.data().correo == this.emailUsuario)
       {
        this.nombreUsuario = doc.data().nombre;
        this.apellidoUsuario = doc.data().apellido;
        this.DNIUsuario = doc.data().DNI;
        this.correoUsuario = doc.data().correo;
        this.tipoUsuario = doc.data().tipo;
        this.fotoUsuario = doc.data().foto;
        this.especialidadUsuario = doc.data().especialidad;
       }
       */

      })
    })
    
  }

}
