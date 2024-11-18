import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClaseService } from 'src/app/services/clase.service';

@Component({
  selector: 'app-seleccionar-clase',
  templateUrl: './seleccionar-clase.page.html',
  styleUrls: ['./seleccionar-clase.page.scss'],
})
export class SeleccionarClasePage implements OnInit {
  clases: any[] = []; // Lista de clases

  constructor(private claseService: ClaseService, private router: Router) {}

  ngOnInit() {
    this.cargarClases();
  }

  // Cargar clases desde la API
  cargarClases() {
    this.claseService.getClases().subscribe(
      (clases) => {
        this.clases = clases;
      },
      (error) => {
        console.error('Error al cargar clases:', error);
      }
    );
  }

  // Seleccionar una clase y navegar a la página del QR
  seleccionarClase(idClase: number) {
    const timestamp = new Date().toISOString(); // Generar el timestamp
    this.router.navigate(['/paginaqr'], { state: { idClase, timestamp } });
  }  

  // Redireccionar a la gestión de clases si no hay clases
  irGestionClases() {
    this.router.navigate(['/gestionar-clases']);
  }
}
