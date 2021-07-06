import { Component, Input, OnInit, Output, EventEmitter, Renderer2, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';
import { DetalladoPublicacionComponent } from '../detallado-publicacion/detallado-publicacion.component';
import { SeleccionarMisArticulosComponent } from '../seleccionar-mis-articulos/seleccionar-mis-articulos.component';

@Component({
  selector: 'app-product-to-sell-card',
  templateUrl: './product-to-sell-card.component.html',
  styleUrls: ['./product-to-sell-card.component.css'],
})
export class ProductToSellCardComponent implements OnInit, AfterViewInit {
  @ViewChild("divCarToSell") divCardToSell: ElementRef;
  @ViewChild("svgFav") svgFav: ElementRef;
  @ViewChild("carrSvg") carrSvg: ElementRef;
  usuarioLogeado;
  esMiPublicacion = false;
  @Input() esVistaCompleta = true;
  @Input() publicacion;
  @Output() comprarClickEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() permutarClickEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() removeItemCarritoEvent: EventEmitter<any> = new EventEmitter<any>();


  constructor(public dialog: MatDialog, private authService: AuthService, private renderer: Renderer2, private dataBase: DatabaseService) {

  }

  public addClass() {
  }
  ngAfterViewInit() {
    if (this.divCardToSell && this.publicacion.idUserQuePublico == this.authService.user['id']) {
      this.esMiPublicacion = true;
      this.renderer.addClass(this.divCardToSell.nativeElement, 'sombraVioleta');
    }
  }
  ngOnInit(): void {

    if (this.publicacion.idUserQuePublico == this.authService.user['id']) {
      this.esMiPublicacion = true;
    }
    this.dataBase.obtenerPorId('usuarios', this.authService.user['id']).subscribe((res) => {
      this.usuarioLogeado = res.payload.data();
      this.usuarioLogeado['id'] = res.payload.id;
      if (this.usuarioLogeado['listaDeFavoritos'] && this.usuarioLogeado['listaDeFavoritos'].includes(this.publicacion.id)) {
        if (this.svgFav) {
          this.renderer.setAttribute(this.svgFav.nativeElement, "fill", "blue");
        }
      }
      if (this.usuarioLogeado['listaDeCarrito'] && this.usuarioLogeado['listaDeCarrito'].includes(this.publicacion.id)) {
        if (this.carrSvg) {
          this.renderer.setStyle(this.carrSvg.nativeElement, "color", "#fff");
        }
      }
    });
  }

  openDialog(publicacion) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      publicacion: publicacion,
      esVistaCompleta: this.esVistaCompleta
    }
    const dialogRef = this.dialog.open(DetalladoPublicacionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

      switch (result) {
        case 'permutar':
          // this.dialog.open(SeleccionarMisArticulosComponent,dialogConfig);
          this.permutarClickEvent.emit(dialogConfig.data.publicacion);
          break;
        case 'comprar':
          this.comprarClickEvent.emit(dialogConfig.data.publicacion);
          break;
        default:
          //no hacemos nada!
          break;
      }
    });
  }
  faviar(publicacion) {
    let listaDeFavs = [];

    if (this.usuarioLogeado['listaDeFavoritos']) {//verificamos si ya tiene algun fav agregado
      listaDeFavs = this.usuarioLogeado['listaDeFavoritos'];

      if (listaDeFavs.includes(publicacion.id)) {//ahora verificamos si tiene esta publicacion faveada
        listaDeFavs = listaDeFavs.filter((idFaveado) => idFaveado != publicacion.id);
        this.renderer.setAttribute(this.svgFav.nativeElement, "fill", "white");
      } else {//sino, lo agregamos
        this.renderer.setAttribute(this.svgFav.nativeElement, "fill", "blue");
        listaDeFavs.push(publicacion.id);
      }

    } else {//sino, faveamos al primero
      listaDeFavs.push(publicacion.id);
      this.renderer.setAttribute(this.svgFav.nativeElement, "fill", "blue");


    }
    this.usuarioLogeado['listaDeFavoritos'] = listaDeFavs;
    this.dataBase.actualizar('usuarios', this.usuarioLogeado, this.usuarioLogeado.id);
  };

  agregarCarro(publicacion) {
    let listaDeCarrito = [];

    if (this.usuarioLogeado['listaDeCarrito']) {//verificamos si ya tiene algun fav agregado
      listaDeCarrito = this.usuarioLogeado['listaDeCarrito'];

      if (listaDeCarrito.includes(publicacion.id)) {//ahora verificamos si tiene esta publicacion en el carro
        listaDeCarrito = listaDeCarrito.filter((idCarrito) => idCarrito != publicacion.id);
        console.log("ACA SI??");
        this.removeItemCarritoEvent.emit(publicacion);
        this.renderer.setStyle(this.carrSvg.nativeElement, "color", "#000");
      } else {//sino, lo agregamos
        this.renderer.setStyle(this.carrSvg.nativeElement, "color", "#fff");
        listaDeCarrito.push(publicacion.id);
      }

    } else {//sino, faveamos al primero
      listaDeCarrito.push(publicacion.id);
      // this.renderer.setAttribute(this.carrSvg.nativeElement, "fill", "blue");
      this.renderer.setStyle(this.carrSvg.nativeElement, "color", "#fff");

    }
    this.usuarioLogeado['listaDeCarrito'] = listaDeCarrito;

    this.dataBase.actualizar('usuarios', this.usuarioLogeado, this.usuarioLogeado.id);
  };


}
