import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


// PAGINA BIENVENIDO.
import { BienvenidoComponent } from './paginas/bienvenido/bienvenido.component';

// PAGINA HOME.
import { HomeComponent } from './paginas/home/home.component';


// COMPONENTE LOGIN.
import { LoginComponent } from './componentes/login/login.component';


// COMPONENTE REGISTRO.
import { RegistroComponent } from './componentes/registro/registro.component';



// GUARD.
import { AuthGuard } from '../app/guards/auth.guard';
import { StepperComponent } from './componentes/stepper/stepper.component';
import { TiendaComponent } from './paginas/tienda/tienda.component';

////////
import { ListaDePersonalComponent } from './componentesAdmin/lista-de-personal/lista-de-personal.component';
import { FormAltaProductoComponent } from './componentes/form-alta-producto/form-alta-producto.component';
import { UsuarioComponent } from './paginas/usuario/usuario/usuario.component';
import { SeleccionarMisArticulosComponent } from './componentes/seleccionar-mis-articulos/seleccionar-mis-articulos.component';
import { NotificacionesComponent } from './componentes/notificaciones/notificaciones.component';



const routes: Routes = [

  { path: 'notificaciones', component: NotificacionesComponent },

  { path: 'testeo', pathMatch: 'full', redirectTo: 'tienda' },
  { path: 'tienda', component: TiendaComponent },
  { path: 'testeo2', component: SeleccionarMisArticulosComponent },
  { path: 'testeo3', component: FormAltaProductoComponent },
  { path: 'home', component: HomeComponent, },

  { path: '', pathMatch: 'full', redirectTo: 'home' },


  { path: 'login', component: LoginComponent },
  { path: 'usuario', component: UsuarioComponent },

  { path: 'registro', component: RegistroComponent },


  { path: 'home', component: HomeComponent },


  { path: 'upload-image', loadChildren: () => import('./shared/upload-image/upload-image.module').then(m => m.UploadImageModule) },
  // , canActivate: [AuthGuard]


  /// ESTO DESPUES BORRAR, PORQUE ES UN COMPONENTE PROPIO DE ADMIN.

  // { path: 'listaPersonal', component: ListaDePersonalComponent },


];







@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
