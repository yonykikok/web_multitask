import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-seleccionar-mis-articulos',
  templateUrl: './seleccionar-mis-articulos.component.html',
  styleUrls: ['./seleccionar-mis-articulos.component.css']
})
export class SeleccionarMisArticulosComponent implements OnInit {
  myListaDePublicaciones: any[] = [];
  selectedOptions;
  // typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  constructor(
    private dataBase: DatabaseService,
    private authService:AuthService
    ) { 

    }
    onNgModelChange(dato){

      console.log(dato);
    }
   
  ngOnInit(): void {
    this.authService.buscarUsuarioLogueado();
    this.dataBase.obtenerTodos('publicaciones').subscribe((res)=>{
      res.forEach(response => {        
        console.log(this.authService.user);
        const publicacion=response.payload.doc.data();
        if(publicacion['idUserQuePublico']==this.authService.user['id']){
          this.myListaDePublicaciones.push(publicacion);
        }
        console.log(publicacion['idUserQuePublico']);
      });
    });
  }

}
