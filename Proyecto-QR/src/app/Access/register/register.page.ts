import { Component } from '@angular/core';
import { UserService } from '../../user.service'; // Asegúrate de que la ruta sea correcta
import { AlertController } from '@ionic/angular'; // Importa el AlertController

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

    constructor(private userService: UserService, private alertController: AlertController) {} // Inyecta el AlertController

    async showAlert(message: string) {
        const alert = await this.alertController.create({
            header: 'Advertencia',
            message: message,
            buttons: ['OK'],
        });
        await alert.present();
    }

    async register() {
        // Reinicia el mensaje de éxito antes de validar
        this.mensaje = ''; // Limpia el mensaje anterior
        this.isSuccess = false; // Resetea el estado de éxito

        // Verificar que todos los campos estén llenos
        if (!this.usuario || !this.nombre || !this.apellido || !this.nivelEducacion || !this.fechaNacimiento || !this.password) {
            await this.showAlert('Todos los campos son obligatorios.'); // Muestra la alerta
            return; // Detiene la ejecución si hay campos vacíos
        }

        // Crea un objeto de usuario con todos los campos requeridos
        const user = {
            usuario: this.usuario,
            nombre: this.nombre,
            apellido: this.apellido,
            nivelEducacion: this.nivelEducacion,
            fechaNacimiento: this.fechaNacimiento,
            contrasena: this.password,
        };
        console.log('Datos a registrar:', user); // Para depuración

        // Llama al método registerUser del servicio UserService
        this.userService.registerUser(user).subscribe({
            next: (response) => {
                console.log('Usuario registrado', response);
                this.mensaje = 'Usuario registrado con éxito';
                this.isSuccess = true; // Indica que la operación fue exitosa
                this.clearForm(); // Opcional: limpiar el formulario
            },
            error: (error) => {
                console.error('Error registrando el usuario', error);
                this.mensaje = `Error al registrar el usuario: ${error.message || 'Error desconocido'}`;
                this.isSuccess = false; // Indica que hubo un error
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
