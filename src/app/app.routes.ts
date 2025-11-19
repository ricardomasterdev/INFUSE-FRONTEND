import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CreditoSearchComponent } from './features/creditos/components/credito-search/credito-search.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'consultar',
    component: CreditoSearchComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
