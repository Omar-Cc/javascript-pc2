import { Routes } from '@angular/router';
import { PropietarioComponent } from './componentes/propietario/propietario.component';
import { InfraccionesComponent } from './componentes/infracciones/infracciones.component';
import { PapeletaComponent } from './componentes/papeleta/papeleta.component';

export const routes: Routes = [
  { path: '', redirectTo: '/propietario', pathMatch: 'full' },
  { path: 'propietario', component: PropietarioComponent },
  { path: 'infracciones', component: InfraccionesComponent },
  { path: 'papeleta', component: PapeletaComponent },
  { path: '**', redirectTo: '/propietario' }
];