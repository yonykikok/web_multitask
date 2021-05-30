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
  consultaSeleccionada;
  mostrarDetalladoConsulta=false;
  listadoConsultasSinResponder: any[] = [];
  displayedColumns: string[] = ['cliente', 'fecha', 'accion'];

  constructor(private authService: AuthService, private firestore: AngularFirestore, private dataBase : DatabaseService) { }

  ngOnInit(): void {

    this.listadoConsultasSinResponder = this.cargarConsultas();
   

  }
  leerConsulta(consulta){
    this.consultaSeleccionada=consulta;
    this.mostrarDetalladoConsulta=true;
  }

  // Esta funcion carga las publicaciones de la base de datos. Incoporar estado.
  cargarConsultas(): any {
    var listaPublicaciones = [];
    this.firestore.collection("consultasAnonimas").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        if (doc.data()['estadoConsulta'] != 'respondido') 
        {
          listaPublicaciones.push(doc.data());
        }

      })
    })

    return listaPublicaciones;
  }



  // esta funcion cambia el estado de la consulta a "respondida"
  cambiarEstadoEnFirebase(consultaRespondida)
  {
    // let auxConsulta = null;
    
    this.firestore.collection("consultasAnonimas").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        if (doc.data()['correo'] == consultaRespondida.correo && doc.data()['horaConsulta'] == consultaRespondida.horaConsulta) 
        {
          // auxConsulta = doc.data();
          this.dataBase.actualizar("consultasAnonimas", consultaRespondida, doc.id);

          if(consultaRespondida.estadoConsulta!='leido'){
            setTimeout(() => {
              // auxConsulta = null; // seteo a null nuevamente la consulta.
              this.listadoConsultasSinResponder = this.cargarConsultas();
            }, 500);
          }
        }

      })
    })

  }

marcarComoLeido(consulta){
  consulta.estadoConsulta='leido';
  this.cambiarEstadoEnFirebase(consulta);
  this.mostrarDetalladoConsulta=false;
}
enviarRespuesta(consultaRespondida){
  if( consultaRespondida!= null &&  consultaRespondida.respuesta.length>1){
    consultaRespondida.estadoConsulta='respondido';    
    this.cambiarEstadoEnFirebase(consultaRespondida);
    this.mostrarDetalladoConsulta=false;
  }
}


}
