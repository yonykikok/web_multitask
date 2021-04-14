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

  public polarAreaChartLabels: Label[] = ['Consultas Anonimas', 'Consultas Anonimas Respondidas'];
  public polarAreaChartData: SingleDataSet = [0, 0];
  public polarAreaLegend = true;
  public polarAreaChartType: ChartType = 'polarArea';
  contadorConsultasAnonimas;
  contadorConsultasAnonimasRespondidas;


  constructor(private firestore : AngularFirestore) { }

  ngOnInit(): void {

    this.contadorConsultasAnonimas = 0;
    this.contadorConsultasAnonimasRespondidas = 0;
    this.obtenerConsultas();


    // Hago que tarde un poco. Sino , no me carga nada.
    setTimeout(() => {
    this.polarAreaChartData = [this.contadorConsultasAnonimasRespondidas, this.contadorConsultasAnonimas]
    }, 2000);

  }


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





}
