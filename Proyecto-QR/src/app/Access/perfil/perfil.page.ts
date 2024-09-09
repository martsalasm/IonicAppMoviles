import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  username = '';
  nombre = '';
  apellido = '';
  nivelEducacion = '';
  fechaNacimiento = '';

  constructor(private router: Router) {
    // Obtener el estado de la navegación
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      username: string;
      nombre: string;
      apellido: string;
      nivelEducacion: string;
      fechaNacimiento: string;
    };

    if (state) {
      // Asignar valores a las propiedades del componente
      this.username = state.username;
      this.nombre = state.nombre;
      this.apellido = state.apellido;
      this.nivelEducacion = state.nivelEducacion;
      this.fechaNacimiento = state.fechaNacimiento;
    }
  }

  ngOnInit() {}
}
