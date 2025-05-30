import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehiculo } from '../modelos/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${this.apiUrl}/vehiculos`);
  }

  buscarPorPropietario(nombre: string): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${this.apiUrl}/vehiculos/propietario/${nombre}`);
  }

  getPapeletasVehiculo(placa: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vehiculos/${placa}/papeletas`);
  }
}