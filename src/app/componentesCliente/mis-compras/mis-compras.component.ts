import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.css']
})
export class MisComprasComponent implements OnInit {
  listaDeCompras = [];
  listaDeVentas = [];

  constructor(private authService: AuthService,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.listaDeCompras = [];
    this.firestore.collection("compras").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        let compra = doc.data();
        compra['id'] = doc.id;
        // console.log(compra['idVendedor'] + "---" + this.authService.user['id']);
        if (compra['idComprador'] === this.authService.user['id']) {
          this.listaDeCompras.push(compra);
        }
        else if(compra['idVendedor'] === this.authService.user['id']) {
          this.listaDeVentas.push(compra);
        }
      })
    })
  }

}
