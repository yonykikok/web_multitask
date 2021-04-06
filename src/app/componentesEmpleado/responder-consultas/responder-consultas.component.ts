import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-responder-consultas',
  templateUrl: './responder-consultas.component.html',
  styleUrls: ['./responder-consultas.component.css']
})
export class ResponderConsultasComponent implements OnInit {

  listadoConsultasSinResponder: any[] = [];

  constructor(private authService: AuthService, private firestore: AngularFirestore) { }

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
  marcarComoResuelta()
  {

  }



}
