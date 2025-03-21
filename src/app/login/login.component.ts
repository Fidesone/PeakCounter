import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PeaksService } from '../peaks.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private peaksService: PeaksService, private router: Router) {}
  onSubmit(formData: any): void {
    console.log('Datos del formulario enviados:', formData);
    this.peaksService.loginUser(formData).subscribe(
      response => {
        if (response.token) { // Verifica si la respuesta contiene el token
          console.log('Inicio de sesión exitoso:', response);
          alert('¡Inicio de sesión completado!');
          // Guarda el token en localStorage
          localStorage.setItem('auth_token', response.token);
          this.router.navigate(['/']);
        } else {
          console.error('Respuesta inesperada:', response);
          alert('Hubo un problema con el inicio de sesión.');
        }
      },
      error => {
        console.error('Error en el login:', error); // Maneja errores
        alert('Credenciales incorrectas o error en el servidor.');
      }
    );
  }
}
