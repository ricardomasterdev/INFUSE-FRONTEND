import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuarioAutenticado } from '../../models/auth.model';

/**
 * Componente de navegação principal
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  menuOpen = false;
  usuarioAutenticado: UsuarioAutenticado | null = null;

  // Relógio em tempo real
  dataHoraAtual: string = '';
  private intervaloRelogio: any;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(usuario => {
      this.usuarioAutenticado = usuario;
    });

    // Atualiza o relógio imediatamente
    this.atualizarDataHora();

    // Atualiza o relógio a cada segundo
    this.intervaloRelogio = setInterval(() => {
      this.atualizarDataHora();
    }, 1000);
  }

  ngOnDestroy(): void {
    // Limpa o intervalo quando o componente for destruído
    if (this.intervaloRelogio) {
      clearInterval(this.intervaloRelogio);
    }
  }

  /**
   * Atualiza a data e hora formatadas
   */
  private atualizarDataHora(): void {
    const agora = new Date();

    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const dia = agora.getDate();
    const mes = meses[agora.getMonth()];
    const ano = agora.getFullYear();

    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');

    this.dataHoraAtual = `${dia} de ${mes} de ${ano} ${horas}:${minutos}:${segundos}`;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    this.authService.logout();
  }
}
