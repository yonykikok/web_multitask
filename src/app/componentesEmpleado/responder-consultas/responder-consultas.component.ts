import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';


// GRIS
import {MatGridListModule} from '@angular/material/grid-list';

// TABLAS
import {MatTableModule} from '@angular/material/table';
import { DatabaseService } from 'src/app/servicios/database.service';



@Component({
  selector: 'app-responder-consultas',
  templateUrl: './responder-consultas.component.html',
  styleUrls: ['./responder-consultas.component.css']
})
export class ResponderConsultasComponent implements OnInit {

  listadoConsultasSinResponder: any[] = [];
  displayedColumns: string[] = ['nombre', 'apellido', 'fecha', 'correo', 'consulta', 'accion'];

  constructor(private authService: AuthService, private firestore: AngularFirestore, private dataBase : DatabaseService) { }

  ngOnInit(): void {

    this.listadoConsultasSinResponder = this.cargarConsultas("sinResponder");

  }


  // Esta funcion carga las publicaciones de la base de datos. Incoporar estado.
  cargarConsultas(estadoConsulta): any {
    var listaPublicaciones = [];
    this.firestore.collection("consultasAnonimas").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        if (doc.data()['estadoConsulta'] == estadoConsulta) 
        {
          listaPublicaciones.push(doc.data());
        }

      })
    })

    return listaPublicaciones;
  }


  // esta funcion cambia el estado de la consulta a "respondida"
  marcarComoResuelta(correo, horaConsulta)
  {
    let auxConsulta = null;
    
    this.firestore.collection("consultasAnonimas").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        if (doc.data()['correo'] == correo && doc.data()['horaConsulta'] == horaConsulta) 
        {
          console.log(doc.data());
          auxConsulta = doc.data();
          auxConsulta.estadoConsulta = "respondido";
          this.dataBase.actualizar("consultasAnonimas", auxConsulta, doc.id);


          setTimeout(() => {
            auxConsulta = null; // seteo a null nuevamente la consulta.
            this.ngOnInit(); // Esto hace que me vuelva a cargar el listado, con los estados cambiados.
          }, 500);
        }

      })
    })

  }





}
