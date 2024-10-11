import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

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
      this.tipoUsuario = capitalize(user.tipoUsuario);

      this.fechaNacimiento = user.fechaNacimiento
        ? new Date(user.fechaNacimiento).toISOString().split('T')[0]
        : null;
    } else {
      console.warn('No se recibieron datos del usuario');
    }
  }

  // Escaneo de QR para estudiantes
async escaneoQR() {
  try {
    await BarcodeScanner.prepare(); // Prepara el escáner
    const result = await BarcodeScanner.startScan(); // Inicia el escaneo

    if (result.hasContent) {
      const usernameToSend = this.username; // Obtiene el nombre de usuario
      console.log("Nombre de usuario a enviar:", usernameToSend);

      // Aquí puedes implementar la lógica para enviar el nombre de usuario al servidor
      // Por ejemplo, podrías llamar a un servicio que maneje el registro de asistencia
      // Ejemplo:
      // await this.asistenciaService.registrarAsistencia(usernameToSend);

      console.log("QR escaneado, asistente registrado:", result.content);
    }
  } catch (error) {
    console.error("Error al escanear el QR:", error);
  }
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
