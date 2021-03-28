import { Component, OnChanges, OnInit } from '@angular/core';

// FIRESTORE
import {AngularFirestore} from "@angular/fire/firestore";

import jwt_decode from "jwt-decode"; // ESTO LO OBTENGO CON npm i jwt-decode
import { Usuario } from 'src/app/clases/usuario';
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

    // this.tokenUsuario = localStorage.getItem('token');
    // this.payloadUsuario = jwt_decode(this.tokenUsuario);
    // this.emailUsuario = this.payloadUsuario.email;

    // this.buscarInfoLogueado();


  }
  ngOnChanges(){
    this.userIsLogged=this.authService.isLogged;
    alert("ENTRA");
  }

  buscarInfoLogueado(){
    let usuario:Usuario;

    this.firestore.collection('usuarios').get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
      if(doc.data()['correo'] == this.emailUsuario)
       { 
         usuario= new Usuario(doc.data()['nombre'],doc.data()['apellido'],doc.data()['DNI'],doc.data()['correo'],doc.data()['tipo'],doc.data()['fotoUsuario']);
         this.authService.user=usuario;

       }
       

      })
    })
    
  }

}
