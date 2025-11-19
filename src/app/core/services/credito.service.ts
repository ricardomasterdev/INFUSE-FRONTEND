import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Credito } from '../models/credito.model';
import { environment } from '../../../environments/environment';

/**
 * Service responsável pela comunicação com a API de créditos.
 * Implementa operações de consulta por NFS-e e por número de crédito.
 */
@Injectable({
  providedIn: 'root'
})
export class CreditoService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Busca todos os créditos disponíveis
   */
  buscarTodos(): Observable<Credito[]> {
    const url = `${this.apiUrl}/creditos`;
    return this.http.get<Credito[]>(url).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /**
   * Busca créditos por número da NFS-e
   * @param numeroNfse Número da Nota Fiscal de Serviços Eletrônica
   * @returns Observable com lista de créditos encontrados
   */
  buscarPorNfse(numeroNfse: string): Observable<Credito[]> {
    const url = `${this.apiUrl}/creditos/${numeroNfse}`;
    return this.http.get<Credito[]>(url).pipe(
      retry(2), // Tenta novamente até 2 vezes em caso de erro
      catchError(this.handleError)
    );
  }

  /**
   * Busca um crédito específico por número do crédito
   * @param numeroCredito Número do crédito constituído
   * @returns Observable com o crédito encontrado
   */
  buscarPorNumeroCredito(numeroCredito: string): Observable<Credito> {
    const url = `${this.apiUrl}/creditos/credito/${numeroCredito}`;
    return this.http.get<Credito>(url).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /**
   * Manipula erros HTTP
   * @param error Erro HTTP recebido
   * @returns Observable com mensagem de erro
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido';

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      switch (error.status) {
        case 404:
          errorMessage = 'Nenhum crédito encontrado com os critérios informados';
          break;
        case 500:
          errorMessage = 'Erro interno do servidor. Tente novamente mais tarde';
          break;
        case 0:
          errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão';
          break;
        default:
          errorMessage = `Erro ${error.status}: ${error.message}`;
      }
    }

    console.error('Erro na requisição:', error);
    return throwError(() => new Error(errorMessage));
  }
}
