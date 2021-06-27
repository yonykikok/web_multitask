import { Component, Input, OnInit } from '@angular/core';
// ANGULAR FIRESTORE.
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from 'src/app/clases/usuario';
import { DatabaseService } from '../../servicios/database.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogModificarDatosComponent } from 'src/app/componentes/dialog-modificar-datos/dialog-modificar-datos.component';




@Component({
  selector: 'app-lista-de-personal',
  templateUrl: './lista-de-personal.component.html',
  styleUrls: ['./lista-de-personal.component.css']
})
export class ListaDePersonalComponent implements OnInit {
  @Input() pedido;
  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'DNI', 'tipo'];
  usuarioAux: Usuario;
  listado: any[] = [];

  constructor(private dataBase: DatabaseService,
    private firestore: AngularFirestore, 
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listado = this.cargarUsuariosQueNoSean();
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
        } else if (this.pedido == 'admin') {
          listaUsuarios.push(doc.data());
        }
      })
    })
    return listaUsuarios;
  }


  borrarUsuario(persona) {
    if (confirm("¿Esta segurx que queire borrar a " + persona.nombre + " " + persona.apellido + "?")) {
      let id: string;
      this.dataBase.obtenerTodos("usuarios").subscribe((auxProdusctos) => {
        auxProdusctos.forEach((response: any) => {
          let userInfo = response.payload.doc.data();
          if (userInfo.correo == persona.correo) {
            id = response.payload.doc.id;
            this.dataBase.eliminar("usuarios", id);
            this.listado = this.cargarUsuariosQueNoSean();
          }
        })
      });
    }
  }


  editarUsuario(persona) {

    const dialogRef = this.dialog.open(DialogModificarDatosComponent, 
      { data: 
        {DNI : persona.DNI, 
        nombre : persona.nombre,
        apellido : persona.apellido} 
      });

  }
}
