import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Financa} from '../models/financa.model';
import {ContaFixa, ContaFixaRecorrente} from '../models/conta-fixa.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContasFixasService {

  private apiUrl = environment.apiUrl + '/contas/fixas'; // substitua pela sua URL

  savedFinanca = new EventEmitter<void>();
  editingFinanca = new EventEmitter<Financa>();

  constructor(private http: HttpClient) {
  }

  listarFinancas(page: number, size: number, sort: string, mes?: number, ano?: number): Observable<Financa[]> {
    let params: any = {
      page,
      size,
      sort
    };

    if (mes !== undefined) {
      params.mes = mes;
    }

    if (ano !== undefined) {
      params.ano = ano;
    }

    return this.http.get<Financa[]>(this.apiUrl, { params });
  }

  salvarFinanca(financa: Financa): Observable<Financa> {
    if (financa.id) {
      // Se tem ID, é uma atualização (PUT)
      return this.http.put<Financa>(`${this.apiUrl}/${financa.id}`, financa);
    }
    // Se não tem ID, é uma criação (POST)
    return this.http.post<Financa>(this.apiUrl, financa);
  }

  excluirFinanca(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getFinancaById(id: number): Observable<Financa> {
    return this.http.get<Financa>(`${this.apiUrl}/${id}`);
  }

  /**
   * Cria múltiplas contas fixas recorrentes
   */
  criarContasFixasRecorrentes(contaRecorrente: ContaFixaRecorrente): Observable<ContaFixa[]> {
    return this.http.post<ContaFixa[]>(`${this.apiUrl}/recorrente`, contaRecorrente);
  }
}
