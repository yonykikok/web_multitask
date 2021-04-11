import { Component, Input, OnInit } from '@angular/core';
// ANGULAR FIRESTORE.
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseService } from '../../servicios/database.service'

@Component({
  selector: 'app-lista-de-personal',
  templateUrl: './lista-de-personal.component.html',
  styleUrls: ['./lista-de-personal.component.css']
})
export class ListaDePersonalComponent implements OnInit {
  @Input() pedido;
  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'DNI', 'tipo'];
  listado: any[] = [];

  constructor(private dataBase: DatabaseService,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.listado = this.cargarUsuariosQueNoSean();
    console.log(this.listado);
    console.log(this.pedido);
  }

  cargarUsuariosQueNoSean(): any {
    var listaUsuarios = [];
    this.firestore.collection("usuarios").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        if (this.pedido == 'empleado') {
          if (doc.data()['tipo'] == 'cliente') {
            listaUsuarios.push(doc.data());
          }
          if (doc.data()['tipo'] == 'st') {
            listaUsuarios.push(doc.data());
          }
        }else if (this.pedido == 'admin'){
          listaUsuarios.push(doc.data());
        }
      })
    })
    return listaUsuarios;
  }

}
