import { Component, Inject, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';
@Component({
  selector: 'app-detallado-publicacion',
  templateUrl: './detallado-publicacion.component.html',
  styleUrls: ['./detallado-publicacion.component.css']
})
export class DetalladoPublicacionComponent implements OnInit {

  @Input() publicacion;
  vendedor;
  esVistaCompleta;
  @Input() esSoloVista;
  user;
  constructor(
    private dataBase: DatabaseService,
    private dialogRef: MatDialogRef<DetalladoPublicacionComponent>,
    @Inject(MAT_DIALOG_DATA) data, private authService: AuthService) {
    this.publicacion = data.publicacion;
    this.esVistaCompleta = data.esVistaCompleta;
    this.esSoloVista = data.esSoloVista;
  }

  ngOnInit(): void {
    this.authService.buscarUsuarioLogueado();
    setTimeout(() => {
      this.user = this.authService.user;
      let botones = document.getElementsByClassName("btnAcciones");
      if (this.user.id == this.publicacion.idUserQuePublico) {
        this.vendedor = this.user;
        for (let i = 0; i < botones.length; i++) {
          botones[i]['disabled'] = true;
        }
      }
      else {//si no soy yo el vendedor, busco al vendedor.
        this.dataBase.obtenerPorId("usuarios", this.publicacion.idUserQuePublico).subscribe((res) => {
          this.vendedor = res.payload.data();
          this.vendedor['id'] = res.payload.id;
        });
      }
    }, 300);


  }
  mostrarListaDeMisPublicaciones() {

  }
  scrollToElement(id) {
    let element = document.getElementById(id);
    if (element != null) {
      scroll({
        top: element.offsetTop,
        behavior: "smooth"
      });
    }
  }
  scrolear() {
    setTimeout(() => {

      this.scrollToElement('divContenedor');
    }, 500);

  }
}
