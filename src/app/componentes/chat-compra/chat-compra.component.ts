import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-chat-compra',
  templateUrl: './chat-compra.component.html',
  styleUrls: ['./chat-compra.component.css']
})
export class ChatCompraComponent implements OnInit, AfterViewInit {
  compra;
  user;
  mensaje;
  constructor(private authService: AuthService,
    private dataBase: DatabaseService,
    private dialogRef: MatDialogRef<ChatCompraComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.user = authService.user;
    this.compra = data.compra;
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    var objDiv = document.getElementById("mensajesContainer");
    objDiv.scrollTop = objDiv.scrollHeight;

  }

  enviarMensaje() {
    let mensaje = {
      mensaje: this.mensaje,
      fechaDeEnvio: Date.now(),
      idEmisor: this.user['id']
    }
    if (!this.compra.mensajes) {
      this.compra.mensajes = []
    }
    this.compra.mensajes.push(mensaje);
    this.mensaje = "";
    this.dataBase.actualizar('compras', this.compra, this.compra.id).then(() => {
      var objDiv = document.getElementById("mensajesContainer");
      objDiv.scrollTop = objDiv.scrollHeight;
    });
  }
}
