import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClaseService {
  private apiUrl = 'http://localhost:3000/api/clases';

  constructor(private http: HttpClient) {}

  // Obtener todas las clases
  getClases(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Agregar una nueva clase
  addClase(nombreClase: string): Observable<any> {
    return this.http.post(this.apiUrl, { nombreClase });
  }

  // Eliminar una clase
  deleteClase(idClase: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idClase}`);
  }
}
