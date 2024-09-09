import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./Access/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./Access/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'recuperar-password',
    loadChildren: () => import('./recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  { path: 'user-management', component: UserManagementComponent },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
