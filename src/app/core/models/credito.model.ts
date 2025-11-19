/**
 * Interface que representa um crédito constituído.
 * Espelha o DTO retornado pela API backend.
 */
export interface Credito {
  numeroCredito: string;
  numeroNfse: string;
  dataConstituicao: string;
  valorIssqn: number;
  tipoCredito: string;
  simplesNacional: string;
  aliquota: number;
  valorFaturado: number;
  valorDeducao: number;
  baseCalculo: number;
}

/**
 * Enum para os tipos de consulta disponíveis
 */
export enum TipoConsulta {
  NFSE = 'NFSE',
  CREDITO = 'CREDITO'
}

/**
 * Interface para parâmetros de busca
 */
export interface BuscaParams {
  tipo: TipoConsulta;
  valor: string;
}

/**
 * Interface genérica para resposta paginada da API
 */
export interface PagedResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
  sortBy?: string;
  sortDirection?: string;
}
