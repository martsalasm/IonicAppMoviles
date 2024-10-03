import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Mantener palabras palabras capitalizadas
const capitalize = (str: string) => {
  if (!str) return str; // Handle empty strings
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

interface User {
  usuario: string;
  nombre: string;
  apellido: string;
  nivelEducacion: string;
  fechaNacimiento: string; // Cambia a string si la fecha llega como un string
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
})
export class PerfilComponent implements OnInit {
  // Propiedades
  username: string = '';
  nombre: string = '';
  apellido: string = '';
  nivelEducacion: string = '';
  fechaNacimiento: string | null = null; // Cambiamos a string para evitar el error

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    // Acceder a los datos del usuario desde el estado de navegación
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
    
    if (state && state['user']) {
      console.log('Datos del usuario recibidos:', state['user']); // Para depuración
      const user = state['user'];

      this.username = capitalize(user.usuario); // Asignamos correctamente las propiedades
      this.nombre = capitalize(user.nombre);
      this.apellido = capitalize(user.apellido);
      this.nivelEducacion = user.nivelEducacion;

      // Convertir la fecha a string (formato: 'YYYY-MM-DD') antes de asignarla
      this.fechaNacimiento = user.fechaNacimiento ? new Date(user.fechaNacimiento).toISOString().split('T')[0] : null;
    } else {
      console.warn('No se recibieron datos del usuario');
    }
  }
}
