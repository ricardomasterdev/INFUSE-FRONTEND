import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CreditoService } from '../../../../core/services/credito.service';
import { Credito, TipoConsulta, PagedResponse } from '../../../../core/models/credito.model';

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
  creditos: Credito[] = [];
  loading: boolean = false;
  erro: string | null = null;
  buscaRealizada: boolean = false;

  // Paginação (agora controlada pelo backend)
  paginaAtual: number = 0; // Zero-based no backend
  itensPorPagina: number = 5;
  totalPaginas: number = 0;
  totalElementos: number = 0;

  // Ordenação (agora enviada ao backend)
  campoOrdenacao: string = 'numeroCredito';
  direcaoOrdenacao: 'ASC' | 'DESC' = 'ASC';

  // Flag para indicar se está em modo de busca específica ou listagem geral
  modoBuscaEspecifica: boolean = false;

  constructor(private creditoService: CreditoService) {}

  /**
   * Inicialização do componente - carrega todos os créditos
   */
  ngOnInit(): void {
    this.carregarTodos();
  }

  /**
   * Carrega todos os créditos disponíveis com paginação do backend
   */
  carregarTodos(): void {
    this.loading = true;
    this.erro = null;
    this.modoBuscaEspecifica = false;

    this.creditoService.buscarTodosPaginado(
      this.paginaAtual,
      this.itensPorPagina,
      this.campoOrdenacao,
      this.direcaoOrdenacao
    ).subscribe({
      next: (response: PagedResponse<Credito>) => {
        this.creditos = response.content;
        this.totalPaginas = response.totalPages;
        this.totalElementos = response.totalElements;
        this.buscaRealizada = true;
        this.loading = false;
      },
      error: (error: Error) => {
        // Se houver erro, apenas mostra a tela vazia para o usuário buscar
        this.creditos = [];
        this.totalPaginas = 0;
        this.totalElementos = 0;
        this.buscaRealizada = false;
        this.loading = false;
      }
    });
  }

  /**
   * Realiza a busca de créditos conforme o tipo selecionado
   * Buscas específicas não usam paginação do backend (retornam poucos resultados)
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
    this.creditos = [];
    this.buscaRealizada = false;
    this.paginaAtual = 0;
    this.modoBuscaEspecifica = true; // Busca específica, sem paginação backend

    // Executa a busca apropriada
    if (this.tipoConsulta === TipoConsulta.NFSE) {
      // Busca por NFS-e (retorna array)
      this.creditoService.buscarPorNfse(this.valorBusca.trim()).subscribe({
        next: (resultado: Credito[]) => {
          this.creditos = resultado;
          this.totalElementos = resultado.length;
          this.totalPaginas = 1;
          this.buscaRealizada = true;
          this.loading = false;
        },
        error: (error: Error) => {
          this.erro = error.message;
          this.creditos = [];
          this.totalElementos = 0;
          this.totalPaginas = 0;
          this.buscaRealizada = true;
          this.loading = false;
        }
      });
    } else {
      // Busca por número de crédito (retorna objeto único)
      this.creditoService.buscarPorNumeroCredito(this.valorBusca.trim()).subscribe({
        next: (resultado: Credito) => {
          this.creditos = [resultado];
          this.totalElementos = 1;
          this.totalPaginas = 1;
          this.buscaRealizada = true;
          this.loading = false;
        },
        error: (error: Error) => {
          this.erro = error.message;
          this.creditos = [];
          this.totalElementos = 0;
          this.totalPaginas = 0;
          this.buscaRealizada = true;
          this.loading = false;
        }
      });
    }
  }

  /**
   * Limpa o formulário e recarrega todos os registros
   */
  limpar(): void {
    this.valorBusca = '';
    this.erro = null;
    this.tipoConsulta = TipoConsulta.NFSE;
    this.paginaAtual = 0;

    // Recarrega todos os registros
    this.carregarTodos();
  }

  /**
   * Ordena os créditos por um campo específico
   * Agora a ordenação é feita pelo backend
   */
  ordenarPor(campo: string): void {
    // Se clicar no mesmo campo, inverte a direção
    if (this.campoOrdenacao === campo) {
      this.direcaoOrdenacao = this.direcaoOrdenacao === 'ASC' ? 'DESC' : 'ASC';
    } else {
      // Se for um campo novo, sempre começa com ascendente
      this.campoOrdenacao = campo;
      this.direcaoOrdenacao = 'ASC';
    }

    // Volta para primeira página e recarrega com nova ordenação
    this.paginaAtual = 0;

    // Se estiver em modo busca específica, não recarrega (poucos itens)
    if (!this.modoBuscaEspecifica) {
      this.carregarTodos();
    }
  }

  /**
   * Muda para uma página específica
   * Agora busca diretamente do backend
   */
  irParaPagina(pagina: number): void {
    // Converte de 1-based (UI) para 0-based (backend)
    const paginaZeroBased = pagina - 1;

    if (paginaZeroBased >= 0 && paginaZeroBased < this.totalPaginas) {
      this.paginaAtual = paginaZeroBased;

      // Se estiver em modo busca específica, não recarrega
      if (!this.modoBuscaEspecifica) {
        this.carregarTodos();
      }
    }
  }

  /**
   * Muda a quantidade de itens por página
   * Reinicia na primeira página e recarrega do backend
   */
  mudarItensPorPagina(): void {
    this.paginaAtual = 0;

    // Se estiver em modo busca específica, não recarrega
    if (!this.modoBuscaEspecifica) {
      this.carregarTodos();
    }
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

  /**
   * Retorna o número da página atual em formato 1-based para exibição
   */
  get paginaAtualExibicao(): number {
    return this.paginaAtual + 1;
  }
}
