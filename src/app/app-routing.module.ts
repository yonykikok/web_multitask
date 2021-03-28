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



const routes: Routes = [


  { path: 'testeo', component: StepperComponent },
  { path: 'home', component: HomeComponent, },

  { path: '', pathMatch: 'full', redirectTo: 'login'},

  
  { path: 'login', component: LoginComponent },

  { path: 'registro', component: RegistroComponent},

  
  { path: 'home', component: HomeComponent },
  // , canActivate: [AuthGuard]

  
 
];







@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
