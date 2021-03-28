import { Injectable } from '@angular/core';

import { AngularFireAuth } from "@angular/fire/auth";
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged:any =false;
  public user:Usuario;
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
