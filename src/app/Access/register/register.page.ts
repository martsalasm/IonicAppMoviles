import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  usuario = ''; // Nombre de usuario
  nombre = '';
  apellido = '';
  nivelEducacion = '';
  fechaNacimiento: string = ''; // Fecha de nacimiento en formato ISO
  password = '';
  mensaje = '';
  showDateTime = false; // Variable para controlar la visibilidad del modal de fecha

  constructor(private router: Router) {}

  register() {
    if (this.validateInputs()) {
      const user = {
        usuario: this.usuario,
        nombre: this.nombre,
        apellido: this.apellido,
        nivelEducacion: this.nivelEducacion,
        fechaNacimiento: this.fechaNacimiento,
        password: this.password,
      };

      // Obtener los usuarios almacenados previamente
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Agregar el nuevo usuario
      users.push(user);

      // Guardar los usuarios actualizados en localStorage
      localStorage.setItem('users', JSON.stringify(users));

      // Redirigir a la página de perfil
      this.router.navigate(['/home'], {
        state: {
          nombre: this.nombre,
          apellido: this.apellido,
          nivelEducacion: this.nivelEducacion,
          fechaNacimiento: this.fechaNacimiento,
        },
      });
    }
  }

  validateInputs(): boolean {
    if (!this.usuario || !this.nombre || !this.apellido || !this.nivelEducacion || !this.fechaNacimiento || !this.password) {
      this.mensaje = 'Por favor, complete todos los campos.';
      return false;
    }
    if (this.password.length < 8 || !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[.,\-!])/.test(this.password)) {
      this.mensaje = 'La contraseña debe tener al menos 8 caracteres y contener al menos una letra, un número y un símbolo.';
      return false;
    }
    this.mensaje = '';
    return true;
  }

  // Ya no necesitas los métodos de apertura/cierre del modal
  onDateChange(event: any) {
    this.fechaNacimiento = event.detail.value; // Almacena la fecha en formato ISO
  }
}
