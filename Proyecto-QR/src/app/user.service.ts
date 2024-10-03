import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface User { // Define la interfaz aquí
  usuario: string;
  nombre: string;
  apellido: string;
  nivelEducacion: string;
  fechaNacimiento: string;
  contrasena: string;
}
@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'http://localhost:3000/api'; // Asegúrate de que esto sea correcto

  constructor(private http: HttpClient) { }

  // Método para obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`); // Asegúrate de que esto sea correcto
  }

  // Método para eliminar un usuario
  deleteUser(usuario: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${usuario}`); // Asegúrate de que la ruta API esté implementada
  }
   // Método para registrar un usuario
   registerUser(user: any): Observable<any> {
    console.log('Datos a registrar:', user);
    return this.http.post(`${this.apiUrl}/register`, user); // Realiza una solicitud POST a la API
    }
}
