import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';

// IMPORTO EL TIMER:
import { Observable, timer } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  user:Usuario;

  currentUser$: Observable<Usuario>;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.currentUser$ = this.authService.obtenerUsuario$();
    this.currentUser$.subscribe(usuarios => {
      this.user = usuarios;     
    });
    this.authService.actualizarUsuario();    
  }

}

/**
 
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';

// FIRESTORE
import {AngularFirestore} from "@angular/fire/firestore";

import jwt_decode from "jwt-decode"; // ESTO LO OBTENGO CON npm i jwt-decode

// IMPORTO EL TIMER:
import { timer } from 'rxjs';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  user:Usuario;
  tokenUsuario;
  payloadUsuario;
  emailUsuario;

  constructor(private authService:AuthService, private firestore : AngularFirestore) { }

  ngOnInit(): void {
     
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


boton1()
{

}

boton2()
{

}

}




 
 
 */

