import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile.component';
import { IonicModule } from '@ionic/angular'; // Importa IonicModule

const routes: Routes = [
  {
    path: '',
    component: EditProfileComponent
  }
];

@NgModule({
  declarations: [EditProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // Asegúrate de incluir IonicModule aquí
    RouterModule.forChild(routes)
  ]
})
export class EditProfileModule { }