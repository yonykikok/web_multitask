import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChatPermutaComponent } from 'src/app/componentes/chat-permuta/chat-permuta.component';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-ver-ofertas-realizadas',
  templateUrl: './ver-ofertas-realizadas.component.html',
  styleUrls: ['./ver-ofertas-realizadas.component.css']
})
export class VerOfertasRealizadasComponent implements OnInit {

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
      console.log(`Dialog result: ${result}`);
    
     
    });
  }
  ngOnInit(): void {
    this.firestore.collection("permutas").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        let permuta=doc.data();
        permuta['id']=doc.id;
        if(permuta['idUserQueOferto']==this.authService.user['id']){
          this.misOfertasAceptadas.push(permuta);
        }
        else if(permuta['idUserQuePublico']==this.authService.user['id'])
        {
          this.misPermutasOfrecidas.push(permuta);
        }
        console.log(permuta);  
    }
    )});
  }

}
