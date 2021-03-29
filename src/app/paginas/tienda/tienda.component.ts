import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  user:Usuario;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    setTimeout(() => {      
      if(this.authService.user!=null)
      {
        this.user=this.authService.user;
        console.log(this.authService.user.toString());
      }
    }, 200);
  }

}
