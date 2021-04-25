import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-reparacion-empleado',
  templateUrl: './reparacion-empleado.component.html',
  styleUrls: ['./reparacion-empleado.component.css']
})
export class ReparacionEmpleadoComponent implements OnInit {

  listaDeReparaciones: any[] = [];
  displayedColumns: string[] = ['fecha', 'marca', 'estado', 'accion'];

  constructor(
    private firestore: AngularFirestore,
    private dataBase: DatabaseService,
    public dialog: MatDialog,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.listaDeReparaciones = this.obtenerReparaciones();
    console.log(this.listaDeReparaciones);
  }

  obtenerReparaciones(): any {
    let reparacion;
    this.listaDeReparaciones = [];
    this.firestore.collection("reparaciones").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        reparacion = doc.data();
        if(reparacion.estado == 'enProceso'){
          this.listaDeReparaciones.push(reparacion);
        }
      })
    })
    return this.listaDeReparaciones;
  }

  cambiarEstado(reparacion, estado) {
    console.log(reparacion);
    reparacion.estadoPublicacion = estado;
    // this.dataBase.actualizar('reparaciones', reparacion, reparacion.id);
    // this.listaDeReparaciones = this.obtenerReparaciones();
  }

}
