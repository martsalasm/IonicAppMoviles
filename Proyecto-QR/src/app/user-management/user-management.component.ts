import { Component, OnInit } from '@angular/core';
import { SQLiteService } from '../sqlite.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];

  constructor(private sqliteService: SQLiteService) {}

  ngOnInit() {
    this.sqliteService.initializeDatabase()
      .then(() => this.loadUsers())
      .catch(e => console.error('Error initializing database:', e));
  }

  async loadUsers() {
    try {
      this.users = await this.sqliteService.getUsers();
      console.log('Loaded users:', this.users);
    } catch (e) {
      console.error('Error loading users:', e);
    }
  }

  async deleteUser(usuario: string) {
    try {
      await this.sqliteService.deleteUser(usuario);
      this.loadUsers();
    } catch (e) {
      console.error('Error deleting user:', e);
    }
  }
}
