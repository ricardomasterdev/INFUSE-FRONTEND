import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Componente do Dashboard principal
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  stats = [
    {
      title: 'Total de Créditos',
      value: '10',
      icon: 'document',
      color: '#2E8B57'
    },
    {
      title: 'Valor Total ISSQN',
      value: 'R$ 13.500,25',
      icon: 'money',
      color: '#059669'
    },
    {
      title: 'NFS-e Cadastradas',
      value: '8',
      icon: 'file',
      color: '#dc2626'
    }
  ];
}
