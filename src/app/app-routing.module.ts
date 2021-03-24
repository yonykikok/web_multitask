import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


// PAGINA BIENVENIDO.
import { BienvenidoComponent } from './paginas/bienvenido/bienvenido.component';

// PAGINA HOME.
import { HomeComponent } from './paginas/home/home.component';


// COMPONENTE LOGIN.
import { LoginComponent } from './componentes/login/login.component';


// GUARD.
import { AuthGuard } from '../app/guards/auth.guard';



const routes: Routes = [


  { path: 'bienvenido', component: BienvenidoComponent, },
  { path: '', pathMatch: 'full', redirectTo: 'bienvenido'},

  
  { path: 'login', component: LoginComponent },

  
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  
 
];







@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
