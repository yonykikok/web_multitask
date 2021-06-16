import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatabaseService } from 'src/app/servicios/database.service';
import { DetalladoPublicacionComponent } from '../detallado-publicacion/detallado-publicacion.component';

@Component({
  selector: 'app-product-to-sell-row',
  templateUrl: './product-to-sell-row.component.html',
  styleUrls: ['./product-to-sell-row.component.css']
})
export class ProductToSellRowComponent implements OnInit {

  @ViewChild("divCarToSell") divCardToSell: ElementRef;
  @ViewChild("svgFav") svgFav: ElementRef;
  usuarioLogeado;
  esMiPublicacion = false;
  @Input() esVistaCompleta = true;
  @Input() publicacion;
  @Output() comprarClickEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() permutarClickEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  vendedor;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private renderer: Renderer2,
    private dataBase: DatabaseService) {
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
      // this.dataBase.obtenerPorId('usuarios', this.publicacion.idUserQuePublico).subscribe((res) => {
      //     this.vendedor = res.payload.data();
      //     this.vendedor['id'] = res.payload.id;
      // });

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
  faviar(publicacion,e) {
    e.stopPropagation();
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

}