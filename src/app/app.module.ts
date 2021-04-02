import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

// ACA IMPORTO LA CONFIGURACION DE MI PROYECTO EN LA CUENTA DE FIREBASE.
import { firebaseConfig } from "../environments/environment";


// PRUEBA:
import { MatSliderModule } from '@angular/material/slider';


// CARDS -> Para login.
import {MatCardModule} from '@angular/material/card';


// FORMBUILDER
import { ReactiveFormsModule } from '@angular/forms';


// BUTTON
import {MatButtonModule} from '@angular/material/button';


// SNACKBAR -> PARA MENSAJES.
import {MatSnackBarModule} from '@angular/material/snack-bar';


// SELECTORS -> Para seleccionar usuario.
import {MatSelectModule} from '@angular/material/select';


// FECHAS -> Para turnos.
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';



// PARA HACER LOS SORTS.
import { MatSortModule } from '@angular/material/sort';


// Para hacer los dialogs.
import {MatDialogModule} from '@angular/material/dialog';




// ANGULAR MATERIAL:
//Angular Material Components
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';




// IMPORTO MODULOS DE ANGULAR
import { AngularFireModule } from "@angular/fire";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './paginas/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { BienvenidoComponent } from './paginas/bienvenido/bienvenido.component';
import { HeaderComponent } from './componentes/header/header.component';
import { HomeClienteComponent } from './paginas/homeCliente/home-cliente/home-cliente.component';
import { HomeAdministradorComponent } from './paginas/homeAdministrador/home-administrador/home-administrador.component';
import { HomeEmpleadoComponent } from './paginas/homeEmpleado/home-empleado/home-empleado.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './componentes/carousel/carousel.component';


import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { RegistroComponent } from './componentes/registro/registro.component';
import { StepperComponent } from './componentes/stepper/stepper.component';
import { StoryWrapComponent } from './componentes/story-wrap/story-wrap.component';
import { TiendaComponent } from './paginas/tienda/tienda.component';
import { ProductToSellCardComponent } from './componentes/product-to-sell-card/product-to-sell-card.component';

import { ListaDePersonalComponent } from './componentesAdmin/lista-de-personal/lista-de-personal.component';

import { SubirImagenesComponentComponent } from './componentes/subir-imagenes-component/subir-imagenes-component.component';
import { BUCKET,AngularFireStorageModule } from '@angular/fire/storage';
import { FormAltaProductoComponent } from './componentes/form-alta-producto/form-alta-producto.component';

import {StorageService } from '../app/shared/upload-image/storage.service';
import { NgMultitaskFilesDirective } from '../app/shared/upload-image/directives/ng-multitask-files.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BienvenidoComponent,
    HeaderComponent,
    HomeClienteComponent,
    HomeAdministradorComponent,
    HomeEmpleadoComponent,
    CarouselComponent,
    RegistroComponent,
    StepperComponent,
    StoryWrapComponent,
    TiendaComponent,
    ProductToSellCardComponent,
    ListaDePersonalComponent,
    NgMultitaskFilesDirective,

    SubirImagenesComponentComponent,

    FormAltaProductoComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireStorageModule,

    ReactiveFormsModule,
    
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatNativeDateModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgbModule,
    NgbPaginationModule,
NgbAlertModule



  ],
  providers: [
    {provide: BUCKET, useValue:'gs://tp-ppsii.appspot.com/'},//para la subida de imagenes,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
