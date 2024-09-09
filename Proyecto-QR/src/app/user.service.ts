// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}

  getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  deleteUser(username: string) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.filter((user: any) => user.usuario !== username);
    localStorage.setItem('users', JSON.stringify(users));
  }
}
