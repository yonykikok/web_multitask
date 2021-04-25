import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-reparaciones-cliente',
  templateUrl: './reparaciones-cliente.component.html',
  styleUrls: ['./reparaciones-cliente.component.css']
})
export class ReparacionesClienteComponent implements OnInit {
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
        console.log(this.authService.user['dni']);
        if (reparacion.DNI == this.authService.user['dni']) {
          this.listaDeReparaciones.push(reparacion);
        }
      })
    })
    return this.listaDeReparaciones;
  }

  pagar(){
    
  }

}
