import { Component } from '@angular/core';
import { UserService } from '../../user.service'; // Asegúrate de que la ruta sea correcta

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
    usuario: string = '';
    nombre: string = '';
    apellido: string = '';
    nivelEducacion: string = '';
    fechaNacimiento: string = '';
    password: string = '';
    mensaje: string = '';

    constructor(private userService: UserService) {}

    register() {
        // Crea un objeto de usuario con todos los campos requeridos
        const user = {
            usuario: this.usuario,
            nombre: this.nombre,
            apellido: this.apellido,
            nivelEducacion: this.nivelEducacion,
            fechaNacimiento: this.fechaNacimiento,
            contrasena: this.password, // Asegúrate de que el nombre del campo coincida con el que usas en la API
        };
        console.log('Datos a registrar:', user); // Para depuración
        // Llama al método registerUser del servicio UserService
        this.userService.registerUser(user).subscribe({
          next: (response) => {
              console.log('Usuario registrado', response);
              this.mensaje = 'Usuario registrado con éxito';
              this.clearForm(); // Opcional: limpiar el formulario
          },
          error: (error) => {
            console.error('Error registrando el usuario', error);
            this.mensaje = `Error al registrar el usuario: ${error.message || 'Error desconocido'}`;
        }
        });
    }

    clearForm() {
        // Limpiar los campos del formulario después del registro
        this.usuario = '';
        this.nombre = '';
        this.apellido = '';
        this.nivelEducacion = '';
        this.fechaNacimiento = '';
        this.password = '';
    }
}
