import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { toDataURL } from 'qrcode';
import { formatDate } from '@angular/common';

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
  qrCodeData: string = ''; // URL de datos del código QR generado para el profesor

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private authService: AuthService
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
      if (result.hasContent && result.content) {
        // Si el escaneo es exitoso, mostrar los datos
        console.log('QR escaneado:', result);
      if (result.content.includes('Asistencia registrada')){
        // Obtén los datos del usuario y la fecha actual
        const timestamp = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
        const body = `
          Asistencia registrada para:
          - Username: ${this.username}
          - Nombre: ${this.nombre}
          - Apellido: ${this.apellido}
          - Fecha y Hora de Registro: ${timestamp}
        `;

        // Construye el URI mailto
        const mailtoURI = `mailto:mart.salasm@duocuc.cl?subject=Asistencia%20registrada&body=${encodeURIComponent(body)}`;

        // Abre el correo usando el URI
        window.open(mailtoURI, '_blank');
        BarcodeScanner.showBackground();
      }}
    } catch (error) {
      console.error('Error al escanear el QR:', error);
    }
  }
  gestionarClases() {
    this.router.navigate(['/gestion-clases']);
  }
//registrar asistencia
registrarAsistencia() {
  this.router.navigate(['/seleccionar-clase']);
}

  // Editar los datos del perfil
  editarDatos() {
    this.router.navigate(['/edit-profile'], {
      state: {
        user: {
          usuario: this.username,
          nombre: this.nombre,
          apellido: this.apellido,
          fechaNacimiento: this.fechaNacimiento,
        },
      },
    });
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

