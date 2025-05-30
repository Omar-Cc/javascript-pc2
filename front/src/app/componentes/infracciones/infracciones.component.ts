import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from '../../services/vehiculo.service';
import { PapeletaService } from '../../services/papeleta.service';
import { Vehiculo } from '../../modelos/vehiculo';
import { Papeleta } from '../../modelos/papeleta';

@Component({
  selector: 'app-infracciones',
  imports: [CommonModule, FormsModule],
  templateUrl: './infracciones.component.html',
  styleUrl: './infracciones.component.css',
})
export class InfraccionesComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  papeletas: Papeleta[] = [];
  vehiculoSeleccionado: string = '';
  placaBusqueda: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(
    private vehiculoService: VehiculoService,
    private papeletaService: PapeletaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarVehiculos();

    // Verificar si llegamos con una placa como parámetro
    this.route.queryParams.subscribe((params) => {
      if (params['placa']) {
        this.placaBusqueda = params['placa'];
        this.vehiculoSeleccionado = params['placa'];
        this.buscarPapeletasPorPlaca();
      }
    });
  }

  cargarVehiculos(): void {
    this.loading = true;
    this.vehiculoService.getVehiculos().subscribe({
      next: (data) => {
        this.vehiculos = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar vehículos';
        this.loading = false;
        console.error(err);
      },
    });
  }

  buscarPapeletasPorPlaca(): void {
    if (!this.placaBusqueda.trim()) {
      this.error = 'Debe ingresar una placa';
      return;
    }

    this.loading = true;
    this.error = '';

    this.papeletaService.getPapeletasPorVehiculo(this.placaBusqueda).subscribe({
      next: (data) => {
        this.papeletas = data;
        this.loading = false;
        if (data.length === 0) {
          this.error = 'No se encontraron papeletas para esta placa';
        }
      },
      error: (err) => {
        this.error = 'Error al buscar papeletas o placa no encontrada';
        this.papeletas = [];
        this.loading = false;
        console.error(err);
      },
    });
  }

  onVehiculoChange(): void {
    if (this.vehiculoSeleccionado) {
      this.placaBusqueda = this.vehiculoSeleccionado;
      this.buscarPapeletasPorPlaca();
    }
  }

  calcularTotalMultas(): number {
    return this.papeletas.reduce(
      (total, papeleta) => total + (papeleta.monto || 0),
      0
    );
  }

  limpiarBusqueda(): void {
    this.placaBusqueda = '';
    this.vehiculoSeleccionado = '';
    this.papeletas = [];
    this.error = '';
    this.router.navigate(['/infracciones']);
  }

  volverAVehiculos(): void {
    this.router.navigate(['/propietario']);
  }

  verDetallePapeleta(numeroPapeleta: string): void {
    this.router.navigate(['/papeleta'], {
      queryParams: { numero: numeroPapeleta },
    });
  }
}
