import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {jwtDecode} from 'jwt-decode';


@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html', 
  styleUrls: ['./header.component.scss'],
  imports: [RouterModule, FormsModule, HttpClientModule, CommonModule]
})

export class HeaderComponent {
  onNavigate(event: Event) {
    console.log('Enlace clicado:', event);
  }

  loggedInUser: string | null = null; // Aquí almacenaremos el nombre del usuario
  
  ngOnInit(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.loggedInUser = decodedToken.name_user;
      console.log('Usuario conectado:', this.loggedInUser); // Verifica si se asigna correctamente
    } else {
      console.log('No hay usuario conectado'); // Verifica si el token está ausente
    }
  }
  
  
  logout(): void {
    localStorage.removeItem('auth_token'); // Limpia el token al cerrar sesión
    this.loggedInUser = null; // Reinicia el estado del usuario
    console.log('Sesión cerrada');
  }
}

