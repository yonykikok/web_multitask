// USE ESTA VERSIÓN:
// npm install chart.js@2.9.3 --save
//npm install ng2-charts@2.2.3 --save


import { Component, OnInit } from '@angular/core';

import { SingleDataSet, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';


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

  
  // GRAFICO USUARIOS
  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  nuevaFecha = new Date();
  public barChartLabels: Label[] = [this.monthNames[this.nuevaFecha.getMonth()]];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [0], label: 'Administradores' },
    { data: [0], label: 'Empleados'},
    { data: [0], label: 'Servicio Tecnico'},
    { data: [0], label: 'Clientes'}
  ];
  contadorAdministradores;
  contadorEmpleados;
  contadorServicioTecnico;
  contadorClientes;



  constructor(private firestore : AngularFirestore) { }

  ngOnInit(): void {

    this.contadorConsultasAnonimas = 0;
    this.contadorConsultasAnonimasRespondidas = 0;
    this.obtenerConsultas();


    this.contadorPublicacionesPendientes = 0;
    this.contadorPublicacionesActivas = 0;
    this.contadorPublicacionesRechazadas = 0;
    this.obtenerPublicaciones();


    this.contadorAdministradores = 0;
    this.contadorEmpleados = 0;
    this.contadorServicioTecnico = 0;
    this.contadorClientes = 0;
    this.obtenerUsuarios();
    


    // Hago que tarde un poco. Sino , no me carga nada.
    setTimeout(() => {

      // cargo el char de consultas.
    this.polarAreaChartData = [this.contadorConsultasAnonimas, this.contadorConsultasAnonimasRespondidas];
    
      // cargo el grafico de publicaciones.
    this.pieChartData = [this.contadorPublicacionesPendientes, this.contadorPublicacionesActivas, this.contadorPublicacionesRechazadas]

      // cargo el grafico de usuarios.
    this.barChartData[0].data = [this.contadorAdministradores]; 
    this.barChartData[1].data = [this.contadorEmpleados]; 
    this.barChartData[2].data = [this.contadorServicioTecnico];
    this.barChartData[3].data = [this.contadorClientes];
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


obtenerUsuarios() 
  {
    this.firestore.collection("usuarios").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        
        if(doc.data()['tipo'] == 'cliente')
        {
          this.contadorClientes += 1;  
        }

        else if(doc.data()['tipo'] == 'empleado')
        {
          this.contadorEmpleados += 1;  
        }

        else if(doc.data()['tipo'] == 'st')
        {
          this.contadorServicioTecnico += 1;  
        }
        else 
        {
          this.contadorAdministradores += 1;  
        }

      })
    })
  }





}
