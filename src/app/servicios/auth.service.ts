import { Injectable } from '@angular/core';

import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth : AngularFireAuth) { }


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


}
