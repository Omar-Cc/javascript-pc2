import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PapeletaService } from '../../services/papeleta.service';
import { PapeletaDetalle } from '../../modelos/papeleta-detalle';

@Component({
  selector: 'app-papeleta',
  imports: [CommonModule, FormsModule],
  templateUrl: './papeleta.component.html',
  styleUrl: './papeleta.component.css'
})
export class PapeletaComponent implements OnInit {
  papeleta: PapeletaDetalle | null = null;
  numeroPapeleta: string = '';
  loading: boolean = false;
  error: string = '';
  fechaConsulta: Date = new Date();

  constructor(
    private papeletaService: PapeletaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verificar si llegamos con un número de papeleta como parámetro
    this.route.queryParams.subscribe(params => {
      if (params['numero']) {
        this.numeroPapeleta = params['numero'];
        this.buscarPapeleta();
      }
    });
  }

  buscarPapeleta(): void {
    if (!this.numeroPapeleta.trim()) {
      this.error = 'Debe ingresar un número de papeleta';
      return;
    }

    this.loading = true;
    this.error = '';
    this.papeleta = null;

    this.papeletaService.getPapeletaPorNumero(this.numeroPapeleta).subscribe({
      next: (data) => {
        this.papeleta = data;
        this.fechaConsulta = new Date();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se encontró la papeleta especificada';
        this.papeleta = null;
        this.loading = false;
        console.error(err);
      }
    });
  }

  limpiarBusqueda(): void {
    this.numeroPapeleta = '';
    this.papeleta = null;
    this.error = '';
    // Limpiar parámetros de la URL
    this.router.navigate(['/papeleta']);
  }

  volverAInfracciones(): void {
    if (this.papeleta?.placa) {
      this.router.navigate(['/infracciones'], { queryParams: { placa: this.papeleta.placa } });
    } else {
      this.router.navigate(['/infracciones']);
    }
  }
}