import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sistema de Gestión de Tránsito';
  currentYear = new Date().getFullYear();
  
  menuItems = [
    {
      path: '/propietario',
      title: 'Vehículos',
      icon: 'bi-car-front-fill',
      description: 'Lista de vehículos y propietarios'
    },
    {
      path: '/infracciones',
      title: 'Infracciones',
      icon: 'bi-clipboard-check-fill',
      description: 'Papeletas por vehículo'
    },
    {
      path: '/papeleta',
      title: 'Consulta',
      icon: 'bi-file-text-fill',
      description: 'Buscar papeleta por número'
    }
  ];

  constructor(private router: Router) {}

  isActiveRoute(path: string): boolean {
    return this.router.url === path;
  }
}