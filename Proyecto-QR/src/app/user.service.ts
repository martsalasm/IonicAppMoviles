import { Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private sqliteService: SQLiteService) {}

  getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  addUser(user: { usuario: string; nombre: string; apellido: string }) {
    // Agregar usuario a SQLite
    this.sqliteService.addUser(user);
    const users = this.getUsers(); // Obtener usuarios actuales desde Local Storage
    users.push(user); // Agregar nuevo usuario
    localStorage.setItem('users', JSON.stringify(users));// Almacenar nuevamente en Local Storage
    console.log('Usuario agregado a localStorage:', user);
  }

  deleteUser(username: string) {
    let users = this.getUsers();
    users = users.filter((user: any) => user.usuario !== username);
    localStorage.setItem('users', JSON.stringify(users));
    console.log('Usuario eliminado de localStorage:', username);
  }
}
