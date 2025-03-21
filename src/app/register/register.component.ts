import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PeaksService } from '../peaks.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  usuario = { nombre: '', email: '', password: '' };

  constructor(private peaksService: PeaksService) {}
  onSubmit(formData: any): void {
    console.log('Datos del formulario enviados:', formData);
    this.peaksService.registerUser(formData).subscribe(
      response => {
        if (response.success) { // Verifica si el campo `success` en la respuesta es true
          console.log('Usuario registrado con éxito:', response);
          alert('Registro completado.');
        } else {
          console.error('Respuesta inesperada:', response);
          alert('Hubo un problema con el registro.');
        }
      },
      error => {
        console.error('Error en el registro:', error); // Detalle completo del error
        alert('Hubo un problema con el registro.');
      }
    );
  }
  onNavigate(event: Event) {
    console.log('Enlace clicado:', event);
  }
}
