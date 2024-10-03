import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
      const user = state['user'];

      this.username = user.usuario; // Asignamos correctamente las propiedades
      this.nombre = user.nombre;
      this.apellido = user.apellido;
      this.nivelEducacion = user.nivelEducacion;

      // Convertir la fecha a string (formato: 'YYYY-MM-DD') antes de asignarla
      this.fechaNacimiento = user.fechaNacimiento ? new Date(user.fechaNacimiento).toISOString().split('T')[0] : null;
    } else {
      console.warn('No se recibieron datos del usuario');
    }
  }
}
