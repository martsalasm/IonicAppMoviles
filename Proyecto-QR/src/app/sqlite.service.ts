import { Injectable } from '@angular/core';
import { SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { CapacitorSQLite } from '@capacitor-community/sqlite'; // Importing CapacitorSQLite
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class SQLiteService {
  private sqlite: SQLiteConnection;
  private db!: SQLiteDBConnection; // Assert that db will be initialized later

  constructor() {
    // Initialize SQLiteConnection with the CapacitorSQLite plugin
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  // Initialize the SQLite Database
  async initializeDatabase() {
    try {
      const dbName = 'user_management_db';

      // Only initialize if the platform supports SQLite
      if (Capacitor.isNativePlatform()) {
        this.db = await this.sqlite.createConnection(
          dbName, // Database name
          false,   // Not encrypted
          'no-encryption', // No encryption mode
          1,       // Database version
          false    // Not read-only
        );
        await this.db.open();
        await this.createTable();
      } else {
        console.warn('SQLite is not supported on this platform.');
      }
    } catch (e) {
      console.error('Error initializing database', e);
    }
  }

  // Create a Table if it doesn't exist
  async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        usuario TEXT PRIMARY KEY,
        nombre TEXT,
        apellido TEXT
      );
    `;
    try {
      await this.db.execute(query);
      console.log('Table created successfully');
    } catch (e) {
      console.error('Error creating table', e);
    }
  }

  // Add a User to the Database
  async addUser(user: { usuario: string; nombre: string; apellido: string }) {
    const query = `
      INSERT INTO users (usuario, nombre, apellido) VALUES (?, ?, ?);
    `;
    const values = [user.usuario, user.nombre, user.apellido];

    try {
      await this.db.run(query, values);
      console.log('User added successfully');
    } catch (e) {
      console.error('Error adding user', e);
    }
  }

  // Get Users from the Database
  async getUsers() {
    const query = `SELECT * FROM users;`;

    try {
      const result = await this.db.query(query);
      return result.values || [];
    } catch (e) {
      console.error('Error getting users', e);
      return [];
    }
  }

  // Delete a User from the Database
  async deleteUser(usuario: string) {
    const query = `DELETE FROM users WHERE usuario = ?;`;

    try {
      await this.db.run(query, [usuario]);
      console.log('User deleted successfully');
    } catch (e) {
      console.error('Error deleting user', e);
    }
  }
}
