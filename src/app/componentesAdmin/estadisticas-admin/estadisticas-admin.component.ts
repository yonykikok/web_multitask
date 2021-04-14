// USE ESTA VERSIÓN:
// npm install chart.js@2.9.3 --save
//npm install ng2-charts@2.2.3 --save


import { Component, OnInit } from '@angular/core';

import { SingleDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';


// ANGULAR FIRESTORE.
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-estadisticas-admin',
  templateUrl: './estadisticas-admin.component.html',
  styleUrls: ['./estadisticas-admin.component.css']
})
export class EstadisticasAdminComponent implements OnInit {



  // ATRIBUTOS UNICAMENTE DEL TOOLBAR.
  boolMostrarEstadisticasConsultas = false;
  boolMostrarEstadisticasPublicaciones = false;
  boolMostrarEstadisticasUsuarios = false;



  // GRAFICO CONSULTAS.

  public polarAreaChartLabels: Label[] = ['Consultas Anonimas', 'Consultas Anonimas Respondidas'];
  public polarAreaChartData: SingleDataSet = [0, 0];
  public polarAreaLegend = true;
  public polarAreaChartType: ChartType = 'polarArea';
  contadorConsultasAnonimas;
  contadorConsultasAnonimasRespondidas;


  // GRAFICO PUBLICACIONES
  public pieChartLabels: Label[] = ['Publicaciones pendientes', 'Publicaciones activas', 'Publicaciones rechazadas'];
  public pieChartData: number[] = [0, 0, 0];
  public pieChartLegend = true;
  public pieChartType: ChartType = 'pie';
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  contadorPublicacionesPendientes;
  contadorPublicacionesActivas;
  contadorPublicacionesRechazadas;





  constructor(private firestore : AngularFirestore) { }

  ngOnInit(): void {

    this.contadorConsultasAnonimas = 0;
    this.contadorConsultasAnonimasRespondidas = 0;
    this.obtenerConsultas();


    this.contadorPublicacionesPendientes = 0;
    this.contadorPublicacionesActivas = 0;
    this.contadorPublicacionesRechazadas = 0;
    this.obtenerPublicaciones();
    


    // Hago que tarde un poco. Sino , no me carga nada.
    setTimeout(() => {
      // cargo el char de consultas.
    this.polarAreaChartData = [this.contadorConsultasAnonimasRespondidas, this.contadorConsultasAnonimas];
      // cargo el grafico de publicaciones.
    this.pieChartData = [this.contadorPublicacionesPendientes, this.contadorPublicacionesActivas, this.contadorPublicacionesRechazadas]
      // cargo el grafico de usuarios.
    }, 2000);

  }


  // FUNCIONES DE TOOLBAR.

  mostrarEstadisticasConsultas() {this.boolMostrarEstadisticasConsultas = true; this.boolMostrarEstadisticasPublicaciones = false; this.boolMostrarEstadisticasUsuarios = false}

  mostrarEstadisticasPublicaciones() {this.boolMostrarEstadisticasConsultas = false; this.boolMostrarEstadisticasPublicaciones = true; this.boolMostrarEstadisticasUsuarios = false}

  mostrarEstadisticasUsuarios() {this.boolMostrarEstadisticasConsultas = false; this.boolMostrarEstadisticasPublicaciones = false; this.boolMostrarEstadisticasUsuarios = true}


obtenerConsultas() 
  {
    this.firestore.collection("consultasAnonimas").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        
        this.contadorConsultasAnonimas += 1;

        if(doc.data()['estadoConsulta'] == 'respondido')
        {
          this.contadorConsultasAnonimasRespondidas += 1;  
        }

      })
    })
  }


obtenerPublicaciones() 
  {
    this.firestore.collection("publicaciones").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        
        if(doc.data()['estadoPublicacion'] == 'pendiente')
        {
          this.contadorPublicacionesPendientes += 1;  
        }

        else if(doc.data()['estadoPublicacion'] == 'aceptado')
        {
          this.contadorPublicacionesActivas += 1;  
        }

        else if(doc.data()['estadoPublicacion'] == 'rechazado')
        {
          this.contadorPublicacionesRechazadas += 1;  
        }

      })
    })
  }





}
