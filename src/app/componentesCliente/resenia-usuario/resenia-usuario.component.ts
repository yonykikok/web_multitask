import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-resenia-usuario',
  templateUrl: './resenia-usuario.component.html',
  styleUrls: ['./resenia-usuario.component.css']
})
export class ReseniaUsuarioComponent implements OnInit {
  @Input() mostrarCompleto = true;
  @Input() usuario;
  estiloBarraGeneral = {
    'width': '0%',
    'background-image': 'linear-gradient(red)'

  };
  constructor(
    private authService: AuthService,
    private dataBase: DatabaseService
  ) { }

  ngOnInit(): void {
    this.dataBase.obtenerPorId("usuarios", this.usuario['id']).subscribe((res) => {
      this.usuario = res.payload.data();
      if (this.usuario['reputacion']) {
        let unaEstrella = 0, dosEstrella = 0, tresEstrella = 0, cuatroEstrella = 0, cincoEstralla = 0;
        this.usuario.reputacion.resenias.forEach(resenia => {
          this.usuario.reputacion.cantDeResenias = this.usuario.reputacion.resenias.length;
          switch (resenia.puntos) {
            case 1:
              unaEstrella += 1;
              break;
            case 2:
              dosEstrella += 1;
              break;
            case 3:
              tresEstrella += 1;
              break;
            case 4:
              cuatroEstrella += 1;
              break;
            case 5:
              cincoEstralla += 1;
              break;
          }
        });
        this.usuario.reputacion.unaEstrella = (unaEstrella / this.usuario.reputacion.cantDeResenias) * 100;
        this.usuario.reputacion.dosEstrella = (dosEstrella / this.usuario.reputacion.cantDeResenias) * 100;
        this.usuario.reputacion.tresEstrella = (tresEstrella / this.usuario.reputacion.cantDeResenias) * 100;
        this.usuario.reputacion.cuatroEstrella = (cuatroEstrella / this.usuario.reputacion.cantDeResenias) * 100;
        this.usuario.reputacion.cincoEstralla = (cincoEstralla / this.usuario.reputacion.cantDeResenias) * 100;
        this.usuario.reputacion.calificacionGeneral = ((1*unaEstrella + 2*dosEstrella + 3*tresEstrella + 
          4*cuatroEstrella + 5*cincoEstralla) / this.usuario.reputacion.cantDeResenias) * 100;
          console.log(this.usuario.reputacion.calificacionGeneral);

        setTimeout(() => {
          
          this.cambiarColorBarraGeneral();
        }, 500);
      } else {
        this.usuario['reputacion'] = {
          cantDeResenias: 0,
          cantDePuntos: 0,
          resenias: [],
          uno: { puntos: 0 },
          dos: { puntos: 0 },
          tres: { puntos: 0 },
          cuatro: { puntos: 0 },
          cinco: { puntos: 0 },
          calificacionGeneral: 0
        }
      }
    });

  }

  cambiarColorBarraGeneral() {
    if (this.usuario.reputacion.calificacionGeneral <= 100) {
      this.estiloBarraGeneral = {
        'width': this.usuario.reputacion.calificacionGeneral + '%',
        'background-image': 'linear-gradient(90deg, red)'
      };
    } else if (this.usuario.reputacion.calificacionGeneral > 100 && this.usuario.reputacion.calificacionGeneral <= 200) {

      this.estiloBarraGeneral = {
        'width': this.usuario.reputacion.calificacionGeneral + '%',
        'background-image': 'linear-gradient(90deg, red,orange)'
      };
    } else if (this.usuario.reputacion.calificacionGeneral > 200 && this.usuario.reputacion.calificacionGeneral <= 300) {

      this.estiloBarraGeneral = {
        'width': this.usuario.reputacion.calificacionGeneral + '%',
        'background-image': 'linear-gradient(90deg,yellow,lightgreen)'
      };
    } else if (this.usuario.reputacion.calificacionGeneral > 300 && this.usuario.reputacion.calificacionGeneral <= 400) {

      this.estiloBarraGeneral = {
        'width': (this.usuario.reputacion.calificacionGeneral/5) + '%',
        'background-image': 'linear-gradient(90deg,lightgreen,green)'
      };
    }
  }


}
