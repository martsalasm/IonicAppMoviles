import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define la interfaz User
export interface User {
  usuario: string;
  nombre: string;
  apellido: string;
  tipoUsuario: string;
  fechaNacimiento: string;
  contrasena?: string; // Opcional, ya que no siempre deberías enviar la contraseña
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api'; // Asegúrate de que esto sea correcto

  constructor(private http: HttpClient) {}

  // Método para obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`); // Asegúrate de que esto sea correcto
  }

  // Método para eliminar un usuario
  deleteUser(usuario: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${usuario}`); // Asegúrate de que la ruta API esté implementada
  }

  // Método para registrar un usuario
  registerUser(user: User): Observable<any> {
    console.log('Datos a registrar:', user);
    return this.http.post(`${this.apiUrl}/register`, user); // Realiza una solicitud POST a la API
  }

  // Método para actualizar un usuario
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${user.usuario}`, user); // Asegúrate de que esto sea correcto
  }
}
