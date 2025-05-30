import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VehiculoService } from '../../services/vehiculo.service';
import { Vehiculo } from '../../modelos/vehiculo';

@Component({
  selector: 'app-propietario',
  imports: [CommonModule, FormsModule],
  templateUrl: './propietario.component.html',
  styleUrl: './propietario.component.css',
})
export class PropietarioComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  vehiculosFiltrados: Vehiculo[] = [];
  loading: boolean = false;
  error: string = '';
  filtroNombre: string = '';

  constructor(
    private vehiculoService: VehiculoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos(): void {
    this.loading = true;
    this.vehiculoService.getVehiculos().subscribe({
      next: (data) => {
        this.vehiculos = data;
        this.vehiculosFiltrados = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar vehículos';
        this.loading = false;
        console.error(err);
      },
    });
  }

  buscarPorPropietario(): void {
    if (!this.filtroNombre.trim()) {
      this.vehiculosFiltrados = this.vehiculos;
      return;
    }

    this.loading = true;
    this.vehiculoService.buscarPorPropietario(this.filtroNombre).subscribe({
      next: (data) => {
        this.vehiculosFiltrados = data;
        this.loading = false;
        if (data.length === 0) {
          this.error = 'No se encontraron vehículos para ese propietario';
        } else {
          this.error = '';
        }
      },
      error: (err) => {
        this.error = 'Error al buscar vehículos';
        this.vehiculosFiltrados = [];
        this.loading = false;
        console.error(err);
      }
    });
  }

  limpiarBusqueda(): void {
    this.filtroNombre = '';
    this.vehiculosFiltrados = this.vehiculos;
    this.error = '';
  }

  verInfracciones(placa: string): void {
    // Navegar a infracciones con la placa como parámetro
    this.router.navigate(['/infracciones'], { queryParams: { placa: placa } });
  }
}