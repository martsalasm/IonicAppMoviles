import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from '../user.service'; //importar el servicio y la interfaz

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
})
export class EditProfileComponent implements OnInit {
  // Propiedades del perfil
  usuario: string = ''; // Añade la propiedad 'usuario'
  nombre: string = '';
  apellido: string = '';
  tipoUsuario: string = ''; // Añade la propiedad 'tipoUsuario'
  fechaNacimiento: string = '';
  contrasena: string = '';

  constructor(private router: Router, private userService: UserService) {} // Inyecta UserService

  ngOnInit() {
    // Cargar datos del usuario
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;

    const user = state && state['user'] ? state['user'] : null;
    if (user) {
      this.usuario = user.usuario; // Asegúrate de cargar el usuario
      this.nombre = user.nombre;
      this.apellido = user.apellido;
      this.tipoUsuario = user.tipoUsuario; // Asegúrate de cargar el tipo de usuario
      this.fechaNacimiento = user.fechaNacimiento;
      this.contrasena = user.contrasena || '';
    }
  }

  guardarCambios() {
    // Crea un objeto con toda la información del usuario
    const updatedUser: User = {
      usuario: this.usuario, // Asegúrate de incluir 'usuario'
      nombre: this.nombre,
      apellido: this.apellido,
      tipoUsuario: this.tipoUsuario, // Asegúrate de incluir 'tipoUsuario'
      fechaNacimiento: this.fechaNacimiento,
      contrasena: this.contrasena, // Asegúrate de incluir la contraseña
    };

    // Llama al servicio para actualizar los datos
    this.userService.updateUser(updatedUser).subscribe({
      next: (response) => {
        console.log('Usuario actualizado:', response);
        this.router.navigate(['/perfil'], { state: { user: updatedUser } });
      },
      error: (error) => {
        console.error('Error al actualizar el usuario:', error);
      }
    });
  }
}
