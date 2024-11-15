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
      BarcodeScanner.hideBackground();
      await BarcodeScanner.prepare();
  
      const result = await BarcodeScanner.startScan();
  
      if (result.hasContent) {
        const usernameToSend = this.username;
        const qrContent = result.content;
  
        // Construye el URI mailto
        const mailtoURI = `mailto:mart.salasm@duocuc.cl?subject=Asistencia%20registrada&body=El%20usuario%20${usernameToSend}%20ha%20registrado%20asistencia.%20Contenido%20del%20QR:%20${encodeURIComponent(
          qrContent
        )}`;
  
        // Abre el correo usando el URI
        window.open(mailtoURI, '_blank');
        BarcodeScanner.showBackground();
      }
    } catch (error) {
      console.error('Error al escanear el QR:', error);
    }
  }
//Genear qr code para profesores
  async generarQRCode() {
    const timestamp = new Date().toISOString();
    const data = `Asistencia registrada a las ${timestamp}`; // Información y timestamp
    try {
      this.qrCodeData = await toDataURL(data, { errorCorrectionLevel: 'H' });
    } catch (err) {
      console.error('Error al generar el QR:', err);
    }
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
