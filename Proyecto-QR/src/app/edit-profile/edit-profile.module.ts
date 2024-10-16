import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile.component';
import { IonicModule } from '@ionic/angular';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
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
    IonicModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule, // Asegúrate de incluir MatInputModule aquí
    RouterModule.forChild(routes)
  ]
})
export class EditProfileModule { }
