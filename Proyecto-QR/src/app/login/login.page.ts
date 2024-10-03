import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {}

  user = {
    usuario: "",
    contrasena: ""
}

ingresar() {
  this.http.post('http://localhost:3000/api/login', this.user).subscribe({
      next: (response: any) => {
          // Si el inicio de sesión es exitoso, redirige al usuario
          let navigationExtras: NavigationExtras = {
              state: {
                  user: response // Guarda la información del usuario en el estado de navegación
              }
          };
      },
      error: (error) => {
          console.error('Error al iniciar sesión', error);
          alert('Usuario o contraseña incorrectos'); // Muestra un mensaje de error
      }
  });
}
}