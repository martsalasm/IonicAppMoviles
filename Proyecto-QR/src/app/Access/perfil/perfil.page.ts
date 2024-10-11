import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Función para capitalizar
const capitalize = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
})
export class PerfilComponent implements OnInit {
  // Propiedades del perfil
  username: string = '';
  nombre: string = '';
  apellido: string = '';
  tipoUsuario: string = '';
  fechaNacimiento: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;

    if (state && state['user']) {
      console.log('Datos del usuario recibidos:', state['user']);
      const user = state['user'];

      this.username = capitalize(user.usuario);
      this.nombre = capitalize(user.nombre);
      this.apellido = capitalize(user.apellido);
      this.tipoUsuario = user.tipoUsuario;

      this.fechaNacimiento = user.fechaNacimiento
        ? new Date(user.fechaNacimiento).toISOString().split('T')[0]
        : null;
    } else {
      console.warn('No se recibieron datos del usuario');
    }
  }

  // Funciones para las acciones del perfil

  // Escaneo de QR para estudiantes
  escaneoQR() {
    console.log("Abriendo cámara para escanear QR...");
    // Lógica para abrir la cámara y escanear el QR
  }

  // Registro de asistencia para profesores
  registrarAsistencia() {
    console.log("Registrando asistencia...");
    // Lógica para registrar asistencia
  }

  // Editar los datos del perfil
  editarDatos() {
    console.log("Editando datos del perfil...");
    // Lógica para editar los datos
  }
}
