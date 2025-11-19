import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CreditoService } from '../../../../core/services/credito.service';
import { Credito, TipoConsulta } from '../../../../core/models/credito.model';

/**
 * Componente responsável pela busca de créditos.
 * Permite consulta por número de NFS-e ou número de crédito com paginação.
 */
@Component({
  selector: 'app-credito-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './credito-search.component.html',
  styleUrls: ['./credito-search.component.css']
})
export class CreditoSearchComponent {
  // Enum exposto no template
  readonly TipoConsulta = TipoConsulta;

  // Campos do formulário/filtros
  tipoConsulta: TipoConsulta = TipoConsulta.NFSE;
  valorBusca: string = '';

  // Resultados e controle de estado
  todosCreditos: Credito[] = [];
  creditos: Credito[] = [];
  loading: boolean = false;
  erro: string | null = null;
  buscaRealizada: boolean = false;

  // Paginação
  paginaAtual: number = 1;
  itensPorPagina: number = 5;
  totalPaginas: number = 0;

  constructor(private creditoService: CreditoService) {}

  /**
   * Inicialização do componente - carrega todos os créditos
   */
  ngOnInit(): void {
    this.carregarTodos();
  }

  /**
   * Carrega todos os créditos disponíveis
   */
  carregarTodos(): void {
    this.loading = true;
    this.erro = null;

    this.creditoService.buscarTodos().subscribe({
      next: (resultado: Credito[]) => {
        this.todosCreditos = resultado;
        this.atualizarPaginacao();
        this.buscaRealizada = true;
        this.loading = false;
      },
      error: (error: Error) => {
        // Se houver erro, apenas mostra a tela vazia para o usuário buscar
        this.todosCreditos = [];
        this.creditos = [];
        this.buscaRealizada = false;
        this.loading = false;
      }
    });
  }

  /**
   * Realiza a busca de créditos conforme o tipo selecionado
   */
  buscar(): void {
    // Validação básica
    if (!this.valorBusca || this.valorBusca.trim() === '') {
      this.erro = 'Por favor, informe um valor para busca';
      return;
    }

    // Reset de estado
    this.loading = true;
    this.erro = null;
    this.todosCreditos = [];
    this.creditos = [];
    this.buscaRealizada = false;
    this.paginaAtual = 1;

    // Executa a busca apropriada
    if (this.tipoConsulta === TipoConsulta.NFSE) {
      // Busca por NFS-e (retorna array)
      this.creditoService.buscarPorNfse(this.valorBusca.trim()).subscribe({
        next: (resultado: Credito[]) => {
          this.todosCreditos = resultado;
          this.atualizarPaginacao();
          this.buscaRealizada = true;
          this.loading = false;
        },
        error: (error: Error) => {
          this.erro = error.message;
          this.todosCreditos = [];
          this.creditos = [];
          this.buscaRealizada = true;
          this.loading = false;
        }
      });
    } else {
      // Busca por número de crédito (retorna objeto único)
      this.creditoService.buscarPorNumeroCredito(this.valorBusca.trim()).subscribe({
        next: (resultado: Credito) => {
          this.todosCreditos = [resultado];
          this.atualizarPaginacao();
          this.buscaRealizada = true;
          this.loading = false;
        },
        error: (error: Error) => {
          this.erro = error.message;
          this.todosCreditos = [];
          this.creditos = [];
          this.buscaRealizada = true;
          this.loading = false;
        }
      });
    }
  }

  /**
   * Limpa o formulário e resultados
   */
  limpar(): void {
    this.valorBusca = '';
    this.todosCreditos = [];
    this.creditos = [];
    this.erro = null;
    this.buscaRealizada = false;
    this.tipoConsulta = TipoConsulta.NFSE;
    this.paginaAtual = 1;
  }

  /**
   * Atualiza a paginação com base nos resultados
   */
  atualizarPaginacao(): void {
    this.totalPaginas = Math.ceil(this.todosCreditos.length / this.itensPorPagina);
    this.atualizarPaginaAtual();
  }

  /**
   * Atualiza os itens da página atual
   */
  atualizarPaginaAtual(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.creditos = this.todosCreditos.slice(inicio, fim);
  }

  /**
   * Muda para uma página específica
   */
  irParaPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaAtual = pagina;
      this.atualizarPaginaAtual();
    }
  }

  /**
   * Muda a quantidade de itens por página
   */
  mudarItensPorPagina(): void {
    this.paginaAtual = 1;
    this.atualizarPaginacao();
  }

  /**
   * Retorna array de páginas para exibir
   */
  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  /**
   * Valida se o botão de busca deve estar habilitado
   */
  get buscarHabilitado(): boolean {
    return this.valorBusca.trim().length > 0 && !this.loading;
  }
}
