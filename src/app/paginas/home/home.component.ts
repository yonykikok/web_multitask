import { AfterViewInit, Component, OnChanges, OnInit, EventEmitter, Output } from '@angular/core';

// FIRESTORE
import { AngularFirestore } from "@angular/fire/firestore";
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

  userIsLogged;
  tokenUsuario;
  payloadUsuario;
  emailUsuario;

  mostrarFormLogin = false;
  // // HARDCODEADO PARA VER EL TIPO DE USUARIO
  // tipoUsuario = 'administrador';

  currentUser$: Observable<Usuario>;
  user: Usuario;

  constructor(private firestore: AngularFirestore,
    private authService: AuthService,
  ) { }


  ngOnInit(): void {

  }
  ngOnChanges() {

  }

  buscarInfoLogueado() {
    let usuario: Usuario;

    this.firestore.collection('usuarios').get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        if (doc.data()['correo'] == this.emailUsuario) {
          usuario = new Usuario(doc.data()['nombre'], doc.data()['apellido'], doc.data()['DNI'], doc.data()['correo'], doc.data()['tipo'], doc.data()['foto']);
          this.authService.user = usuario;

        }
      })
    })
    console.log(this.authService.user);
  }

}
