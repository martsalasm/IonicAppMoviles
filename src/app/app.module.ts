import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Corregido a BrowserAnimationsModule
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserManagementComponent } from './user-management/user-management.component'; // Importa UserManagementComponent

@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent // Agrega el componente a las declaraciones
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    FormsModule, // Agregado FormsModule para usar ngModel
    BrowserAnimationsModule, // Cambiado a BrowserAnimationsModule
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
