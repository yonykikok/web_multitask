import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChatPermutaComponent } from 'src/app/componentes/chat-permuta/chat-permuta.component';
import { DetalladoPublicacionComponent } from 'src/app/componentes/detallado-publicacion/detallado-publicacion.component';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-ver-ofertas',
  templateUrl: './ver-ofertas.component.html',
  styleUrls: ['./ver-ofertas.component.css']
})
export class VerOfertasComponent implements OnInit {

  misOfertasAceptadas=[];
  misPermutasOfrecidas=[];
  constructor(private firestore:AngularFirestore,
    private authService:AuthService, public dialog: MatDialog) { }
 openDialog(oferta) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      oferta:oferta,
    }
    const dialogRef = this.dialog.open(ChatPermutaComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    
     
    });
  }
  expandirVista(publicacion){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      publicacion:publicacion,
      esSoloVista:true
    }
    

    const dialogRef = this.dialog.open(DetalladoPublicacionComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    
     
    });
  }
  ngOnInit(): void {
    this.firestore.collection("permutas").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        let permuta=doc.data();
        permuta['id']=doc.id;
        
        if(permuta['idUserQuePublico']==this.authService.user['id']){//soy el que recibe la oferta!
          this.misOfertasAceptadas.push(permuta);
        }
        else if(permuta['idUserQueOferto']==this.authService.user['id'])//soy el que ofrece!
        {
          this.misPermutasOfrecidas.push(permuta);
        }
    }
    )});
  }

}
