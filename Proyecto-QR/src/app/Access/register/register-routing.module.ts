import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterPage } from './register.page'; // Importa desde el archivo correcto

const routes: Routes = [
  {
    path: '',
    component: RegisterPage // Asegúrate de que este sea el componente correcto
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPageRoutingModule {}
