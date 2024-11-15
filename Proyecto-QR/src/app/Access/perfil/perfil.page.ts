import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service'; // Importa AuthService
import { toDataURL } from 'qrcode';
// Función para capitalizar
const capitalize = (str: string) => {
  if (!str) return str;
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
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
  qrCodeData: string = '';

  async generarQRCode() {
    const data = 'Informacion para registrar asistencia'; // Información necesaria
  
    try {
      this.qrCodeData = await toDataURL(data, { errorCorrectionLevel: 'H' });
    } catch (err) {
      console.error('Error al generar el QR:', err);
    }
  }

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private authService: AuthService // Inyecta AuthService en el constructor
  ) {} 

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
    const permission = await BarcodeScanner.checkPermission({ force: true });
    
    if (!permission.granted) {
      const alert = await this.alertCtrl.create({
        header: 'Permiso necesario',
        message: 'Debes otorgar permisos de cámara para escanear el QR.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      BarcodeScanner.hideBackground(); // Para ocultar el fondo mientras se escanea
      await BarcodeScanner.prepare(); // Prepara el escáner

      const result = await BarcodeScanner.startScan(); // Inicia el escaneo

      if (result.hasContent) {
        const usernameToSend = this.username;
        console.log('Nombre de usuario a enviar:', usernameToSend);
        console.log('QR escaneado, contenido:', result.content);

        // Aquí implementar la lógica para enviar el nombre de usuario al servidor
        // Ejemplo:
        // await this.asistenciaService.registrarAsistencia(usernameToSend);

        BarcodeScanner.showBackground(); // Muestra el fondo después del escaneo
      }
    } catch (error) {
      console.error('Error al escanear el QR:', error);
    }
  }

  // Registro de asistencia para profesores
  registrarAsistencia() {
    console.log("Registrando asistencia...");
    // Lógica para registrar asistencia
  }

  // Editar los datos del perfil
  editarDatos() {
    this.router.navigate(['/edit-profile'], { state: { user: { 
      usuario: this.username, // Agregar el nombre de usuario
      nombre: this.nombre, 
      apellido: this.apellido, 
      fechaNacimiento: this.fechaNacimiento 
    }}});
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout(); // Llama al método logout del AuthService para eliminar al usuario del localStorage
    this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
  }
}
