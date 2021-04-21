import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-chat-permuta',
  templateUrl: './chat-permuta.component.html',
  styleUrls: ['./chat-permuta.component.css']
})
export class ChatPermutaComponent implements OnInit {
  mensaje;
  listaDeMensajes;
  oferta;
  user;
  constructor(private dialogRef: MatDialogRef<ChatPermutaComponent>,
    @Inject(MAT_DIALOG_DATA) data, private authService:AuthService, private dataBase: DatabaseService,) { 
      this.oferta = data.oferta;
    }

  ngOnInit(): void {
    this.user=this.authService.user;
  }

  enviarMensaje(){
    let mensaje={
      mensaje:this.mensaje,
      fechaDeEnvio:Date.now(),
      idEmisor:this.user['id']
    }
    if(!this.oferta.mensajes){
      this.oferta.mensajes=[]
    }
    this.oferta.mensajes.push(mensaje);
    this.dataBase.actualizar('permutas',this.oferta,this.oferta.id);
  }
}
