import { Component, OnInit } from '@angular/core';
import { SQLiteService } from '../sqlite.service';
import { UserService } from '../user.service'; // Asegúrate de importar UserService
import { Capacitor } from '@capacitor/core'; // Importa Capacitor

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  newUser = { usuario: '', nombre: '', apellido: '' }; // Para almacenar datos del nuevo usuario

  constructor(private sqliteService: SQLiteService, private userService: UserService) {}

  ngOnInit() {
    this.sqliteService.initializeDatabase()
      .then(() => this.loadUsers())
      .catch(e => console.error('Error initializing database:', e));
  }
  async loadUsers() {
    // Intenta cargar desde SQLite
    this.users = await this.sqliteService.getUsers();
    
    // Si no hay usuarios en SQLite, carga desde Local Storage como respaldo
    if (this.users.length === 0) {
      this.users = JSON.parse(localStorage.getItem('users') || '[]');
    }
  
    console.log('Loaded users:', this.users);
  }
 
  /* async loadUsers() {
    try {
      this.users = this.userService.getUsers();//await this.sqliteService.getUsers();
      console.log('Loaded users:', this.users);
    } catch (e) {
      console.error('Error loading users:', e);
    }
  }*/

  async onAddUser() {
    const { usuario, nombre, apellido } = this.newUser; // Desestructura el nuevo usuario

    if (Capacitor.isNativePlatform()) {
      await this.sqliteService.addUser({ usuario, nombre, apellido });
    } else {
      this.userService.addUser({ usuario, nombre, apellido });
    }

    await this.loadUsers(); // Recargar la lista de usuarios
    this.newUser = { usuario: '', nombre: '', apellido: '' }; // Limpiar el formulario
  }

  async deleteUser(usuario: string) {
    try {
      this.userService.deleteUser(usuario);//await this.sqliteService.deleteUser(usuario);
      this.loadUsers();
    } catch (e) {
      console.error('Error deleting user:', e);
    }
  }
}
