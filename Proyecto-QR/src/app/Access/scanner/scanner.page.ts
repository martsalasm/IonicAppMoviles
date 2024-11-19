import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
})
export class ScannerPage implements OnInit {
  @ViewChild('videoElement', { static: false }) videoElement: ElementRef<HTMLVideoElement> | undefined;

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {
    this.startCamera();
  }

  // Inicia la cámara trasera
  async startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Esto asegura que la cámara trasera se use
      });

      if (this.videoElement?.nativeElement) {
        this.videoElement.nativeElement.srcObject = stream;
      }
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
      this.showErrorAlert('No se pudo acceder a la cámara. Asegúrate de que tengas los permisos necesarios.');
    }
  }

  // Mostrar alerta de error
  async showErrorAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Detecta el QR al estar escaneando
  async startScan() {
    const result = await BarcodeScanner.startScan();
    if (result.hasContent) {
      console.log('QR escaneado:', result.content);
      // Realizar alguna acción con el contenido del QR
      // Ejemplo: registrar asistencia, etc.
    }
  }

  // Detener la cámara cuando salimos de la página
  ionViewWillLeave() {
    const stream = this.videoElement?.nativeElement?.srcObject as MediaStream;
    const tracks = stream?.getTracks();
    tracks?.forEach(track => track.stop());
  }
}
