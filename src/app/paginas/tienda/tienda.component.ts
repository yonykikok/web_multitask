import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

// IMPORTO EL TIMER:
import { Observable, timer } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  mostrar;
  user: Usuario;
  currentUser$: Observable<Usuario>;
  listado: any[] = [];


  constructor(private authService: AuthService, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.currentUser$ = this.authService.obtenerUsuario$();
    this.currentUser$.subscribe(usuarios => {
      this.user = usuarios;
    });
    this.authService.actualizarUsuario();

    this.listado = this.cargarPublicacionesActivas();
  }



  // ERROR CON ESTO. A VECES TARDA EN ENCONTRAR TODO.
  // Esta funcion carga las publicaciones de la base de datos. Incoporar estado.
  cargarPublicacionesActivas(): any {
    var listaPublicaciones = [];
    this.firestore.collection("publicaciones").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        //if (doc.data()['tipo'] != tipoUsuario) 
          listaPublicaciones.push(doc.data());

      })
    })
    console.log(listaPublicaciones);
    return listaPublicaciones;
  }


  

}

