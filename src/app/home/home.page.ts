import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

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

  constructor(private router: Router, private animationController: AnimationController) {}

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
        // Buscar usuario en localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find((storedUser: any) => 
          storedUser.usuario === this.user.username && storedUser.password === this.user.password
        );

        if (foundUser) {
          this.mensaje = 'Conexión exitosa';
          let navigationExtras: NavigationExtras = {
            state: {
              username: foundUser.usuario,
              nombre: foundUser.nombre,
              apellido: foundUser.apellido,
              nivelEducacion: foundUser.nivelEducacion,
              fechaNacimiento: foundUser.fechaNacimiento
            },
          };
          this.cambiarSpinner();
          setTimeout(() => {
            this.router.navigate(['/perfil'], navigationExtras); // Redirige a la página de inicio
            this.cambiarSpinner();
            this.mensaje = "";
          }, 3000);
        } else {
          this.mensaje = 'Usuario o contraseña incorrectos';
        }
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
