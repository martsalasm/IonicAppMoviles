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
    isSuccess: boolean = false; // Propiedad para controlar el estado del mensaje

    constructor(private userService: UserService) {}

    register() {
        const user = {
            usuario: this.usuario,
            nombre: this.nombre,
            apellido: this.apellido,
            nivelEducacion: this.nivelEducacion,
            fechaNacimiento: this.fechaNacimiento,
            contrasena: this.password,
        };
        console.log('Datos a registrar:', user);
        this.userService.registerUser(user).subscribe({
            next: (response) => {
                console.log('Usuario registrado', response);
                this.mensaje = 'Usuario registrado con éxito';
                this.isSuccess = true; // Indica que la operación fue exitosa
                this.clearForm();
            },
            error: (error) => {
                console.error('Error registrando el usuario', error);
                this.mensaje = `Error al registrar el usuario: ${error.message || 'Error desconocido'}`;
                this.isSuccess = false; // Indica que hubo un error
            }
        });
    }

    clearForm() {
        this.usuario = '';
        this.nombre = '';
        this.apellido = '';
        this.nivelEducacion = '';
        this.fechaNacimiento = '';
        this.password = '';
    }
}
