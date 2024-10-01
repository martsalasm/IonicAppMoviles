import { Injectable } from '@angular/core';
import { SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { CapacitorSQLite } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';  // Capacitor Preferences as fallback

@Injectable({
  providedIn: 'root',
})
export class SQLiteService {
  private sqlite: SQLiteConnection;
  private db!: SQLiteDBConnection;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async initializeDatabase() {
    if (Capacitor.isNativePlatform()) {
      // Use SQLite if the platform is native
      await this.initSQLite();
    } else {
      // Use local storage (or IndexedDB) in the browser
      console.warn('Using Preferences for browser storage');
    }
  }

  // Initialize SQLite on native platforms
  async initSQLite() {
    try {
      const dbName = 'user_management_db';
      this.db = await this.sqlite.createConnection(dbName, false, 'no-encryption', 1, false);
      await this.db.open();
      await this.createTable();
    } catch (e) {
      console.error('Error initializing SQLite database:', e);
    }
  }

  // Create table if not exists
  async createTable() {
    if (Capacitor.isNativePlatform()) {
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
        console.error('Error creating table:', e);
      }
    }
  }

  // Add a user to SQLite (native) or Preferences (web)
  async addUser(user: { usuario: string; nombre: string; apellido: string }) {
    if (Capacitor.isNativePlatform()) {
      const query = `
        INSERT INTO users (usuario, nombre, apellido) VALUES (?, ?, ?);
      `;
      try {
        await this.db.run(query, [user.usuario, user.nombre, user.apellido]);
        console.log('User added to SQLite');
      } catch (e) {
        console.error('Error adding user to SQLite:', e);
      }
    } else {
      // Use Preferences for web (LocalStorage or IndexedDB could also be used here)
      await Preferences.set({
        key: user.usuario,
        value: JSON.stringify(user),
      });
      console.log('User added to Preferences (web)');
    }
  }

  // Get users from SQLite (native) or Preferences (web)
  async getUsers() {
    if (Capacitor.isNativePlatform()) {
      const query = `SELECT * FROM users;`;
      try {
        const result = await this.db.query(query);
        return result.values || [];
      } catch (e) {
        console.error('Error retrieving users from SQLite:', e);
        return [];
      }
    } else {
      const { keys } = await Preferences.keys();
      const users = [];
      for (const key of keys) {
        const { value } = await Preferences.get({ key });
        if (value) {
          users.push(JSON.parse(value));
        }
      }
      return users;
    }
  }

  // Delete a user from SQLite (native) or Preferences (web)
  async deleteUser(usuario: string) {
    if (Capacitor.isNativePlatform()) {
      const query = `DELETE FROM users WHERE usuario = ?;`;
      try {
        await this.db.run(query, [usuario]);
        console.log('User deleted from SQLite');
      } catch (e) {
        console.error('Error deleting user from SQLite:', e);
      }
    } else {
      await Preferences.remove({ key: usuario });
      console.log('User deleted from Preferences (web)');
    }
  }
}
