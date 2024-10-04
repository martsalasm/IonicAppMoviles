import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user = {
    username: '',
    password: ''
  };
  showPassword: boolean = false;
  mensaje = '';
  spinner = false;

  constructor(private router: Router, private animationController: AnimationController, private http: HttpClient) {} // Inyección de HttpClient

  ngAfterContentInit() {
    this.animarLogin();
  }

  animarLogin() {
    const loginIcon = document.querySelector(".login img") as HTMLElement;
    const animacion = this.animationController.create()
      .addElement(loginIcon)
      .duration(4000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'translateX(0)', opacity: '1' },
        { offset: 0.5, transform: 'translateX(50vw)', opacity: '0.2' },
        { offset: 1, transform: 'translateX(0)', opacity: '1' }
      ]);
    animacion.play();
  }

  cambiarSpinner() {
    this.spinner = !this.spinner;
  }

  validar() {
    const complexPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[.,\-!])[a-zA-Z0-9.,\-!]*$/;

    if (this.user.username.length > 0) {
      if (this.user.password.length >= 8 && complexPattern.test(this.user.password)) {
          // Muestra el spinner antes de llamar a la API
          this.cambiarSpinner();

          // LLamada a la api para login
          this.http.post('http://localhost:3000/api/login', {
            usuario: this.user.username.toLowerCase(), // Normaliza a minúsculas
            contrasena: this.user.password
          }).subscribe({
              next: (response: any) => {
                  console.log('Respuesta de la API:', response); // Verifica la estructura de la respuesta
          
                  let navigationExtras: NavigationExtras = {
                      state: {
                          user: {
                            usuario: response.usuario, // Aquí estás accediendo directamente al valor
                            nombre: response.nombre,
                            apellido: response.apellido,
                            nivelEducacion: response.nivelEducacion,
                            fechaNacimiento: response.fechaNacimiento,
                          }
                      }
                  };
          
                  // Asegúrate de pasar las propiedades adecuadamente
                  this.router.navigate(['/perfil'], navigationExtras);
                  this.cambiarSpinner(); // Detiene el spinner
              },
              error: (error) => {
                  console.error('Error al iniciar sesión', error);
                  this.mensaje = 'Usuario o contraseña incorrectos';
                  this.cambiarSpinner(); // Detiene el spinner
              }
          });
      } else {
          this.mensaje = 'Su contraseña debe tener un largo de 8 caracteres y contener al menos 1 número, 1 letra y 1 símbolo';
      }
    } else {
        this.mensaje = 'Usuario vacío';
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
