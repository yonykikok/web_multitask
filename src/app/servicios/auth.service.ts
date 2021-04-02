import { Injectable } from '@angular/core';

import { AngularFireAuth } from "@angular/fire/auth";

import { Usuario } from '../clases/usuario';

// FIRESTORE
import {AngularFirestore} from "@angular/fire/firestore";

import jwt_decode from "jwt-decode"; // ESTO LO OBTENGO CON npm i jwt-decode

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged:any =false;

  public user : Usuario;

  tokenUsuario;
  payloadUsuario;
  emailUsuario;

  constructor(private AFauth : AngularFireAuth, private firestore : AngularFirestore) { }



  // FUNCION PARA LOGUEARSE EN EL SISTEMA.
  // * Recibe un String email como primer parametro.
  // * Recibe un String contraseña como segundo parametro.
  // Retorna un token y lo setea. 


  login(email : string, password : string){

    return new Promise((resolve, rejected) => {
  
    this.AFauth.signInWithEmailAndPassword(email, password)
    
    .then (user => resolve(user.user.getIdToken()
    .then (d => {localStorage.setItem('token', d)})
    ))
    
    .catch(err => rejected(err))
  
    });

}


  // FUNCION PARA REGISTRARSE EN EL SISTEMA.
  // * Recibe un String email como primer parametro.
  // * Recibe un String contraseña como segundo parametro.


register(email : string, password : string){

  return new Promise((resolve, rejected) => {

  this.AFauth.createUserWithEmailAndPassword(email, password)
  
  .then (user => resolve(user))
  
  .catch(err => rejected(err))

  });

}


buscarUsuarioLogueado() 
{
  this.tokenUsuario = localStorage.getItem('token');
  this.payloadUsuario = jwt_decode(this.tokenUsuario);
  this.emailUsuario = this.payloadUsuario.email;

  let usuario:Usuario;

    this.firestore.collection('usuarios').get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
      if(doc.data()['correo'].toUpperCase() == this.emailUsuario.toUpperCase())
       { 
         usuario= new Usuario(doc.data()['nombre'],doc.data()['apellido'],doc.data()['DNI'],doc.data()['correo'],doc.data()['tipo'],doc.data()['foto']);
         this.user = usuario;
         console.log("ENCUENTRO EL USUARIO")
       }
      })
    })
}




}
