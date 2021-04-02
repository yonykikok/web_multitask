import { Component, OnInit } from '@angular/core';

// ANGULAR FIRESTORE.
import { AngularFirestore } from '@angular/fire/firestore';

import { DatabaseService } from '../../servicios/database.service'


@Component({
  selector: 'app-lista-de-personal',
  templateUrl: './lista-de-personal.component.html',
  styleUrls: ['./lista-de-personal.component.css']
})
export class ListaDePersonalComponent implements OnInit {


  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'DNI', 'tipo'];
  listado: any[] = [];

  constructor(private dataBase: DatabaseService,
    private firestore: AngularFirestore) { }


  ngOnInit(): void {


    this.listado = this.cargarUsuariosQueNoSean("cliente");
    console.log(this.listado);

  }



  cargarUsuariosQueNoSean(tipoUsuario: string): any {

    var listaUsuarios = [];
    this.firestore.collection("usuarios").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {

        // Acá cambiar a !=
        if (doc.data()['tipo'] != tipoUsuario) {
          listaUsuarios.push(doc.data());
        }

      })
    })

    return listaUsuarios;
  }

}
