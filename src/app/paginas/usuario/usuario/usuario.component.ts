import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';

import { AngularFirestore } from "@angular/fire/firestore";
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {

  user: Usuario;

  //
  tokenUsuario;
  payloadUsuario;
  emailUsuario;

  // constructor(private authService: AuthService) { }
  constructor(private authService: AuthService, private firestore: AngularFirestore) { }

  ngOnInit(): void {

    // this.authService.buscarUsuarioLogueado();

    // setTimeout(() => {
    //   this.user = this.authService.user;
    //   console.log(this.user);
    // }, 2000);
    console.log("Empezamos 1");


    //por ahora uso esta forma que e sla que me dijo lucho, cuando jony arregle uso la suya
    //ahora lo esta haciendo asincronico y es mala practica porque tira eeror hasta que los datos llegan
    //CAMBIAR -s
    this.tokenUsuario = localStorage.getItem('token');
    this.payloadUsuario = jwt_decode(this.tokenUsuario);
    this.emailUsuario = this.payloadUsuario.email;

    let usuario: Usuario;

    this.firestore.collection('usuarios').get().subscribe((querySnapShot) => {
    console.log("2");
      querySnapShot.forEach((doc) => {
        if (doc.data()['correo'].toUpperCase() == this.emailUsuario.toUpperCase()) {
          usuario = new Usuario(doc.data()['nombre'], doc.data()['apellido'], doc.data()['DNI'], doc.data()['correo'], doc.data()['tipo'], doc.data()['foto']);
          this.user = usuario;
          console.log("ENCUENTRO EL USUARIO")
          console.log(this.user.apellido);
        }
      })
    })


  }



}
