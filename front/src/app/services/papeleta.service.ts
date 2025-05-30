import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Papeleta } from '../modelos/papeleta';
import { PapeletaDetalle } from '../modelos/papeleta-detalle';

@Injectable({
  providedIn: 'root'
})
export class PapeletaService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getPapeletas(): Observable<Papeleta[]> {
    return this.http.get<Papeleta[]>(`${this.apiUrl}/papeletas`);
  }

  getPapeletasPorVehiculo(placa: string): Observable<Papeleta[]> {
    return this.http.get<Papeleta[]>(`${this.apiUrl}/papeletas/vehiculo/${placa}`);
  }

  getPapeletaPorNumero(numero: string): Observable<PapeletaDetalle> {
    return this.http.get<PapeletaDetalle>(`${this.apiUrl}/papeletas/${numero}`);
  }
}