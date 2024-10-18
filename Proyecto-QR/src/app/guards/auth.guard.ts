import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Obtén el usuario del localStorage
    const user = localStorage.getItem('user');
    console.log('Valor de usuario en localStorage:', user); // Verificar qué hay en localStorage

    const isAuthenticated = !!user; // Verifica si el usuario está almacenado

    if (!isAuthenticated) {
      console.warn('Usuario no autenticado. Redirigiendo al login...');
      this.router.navigate(['/login']);
      return false; // Bloquea el acceso si no está autenticado
    }

    return true; // Permitir acceso si está autenticado
  }
}
