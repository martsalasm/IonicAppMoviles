import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_KEY = 'user'; // Llave para almacenar los datos del usuario en localStorage

  constructor() {}

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.USER_KEY); // Devuelve true si hay un usuario almacenado
  }

  // Método para guardar los datos del usuario al iniciar sesión
  login(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user)); // Guarda al usuario en localStorage
  }

  // Método para cerrar sesión y eliminar los datos del usuario
  logout(): void {
    localStorage.removeItem(this.USER_KEY); // Elimina al usuario del localStorage
  }

  // Método para obtener los datos del usuario desde localStorage
  getUser(): any {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null; // Devuelve los datos del usuario o null si no hay ninguno
  }
}
