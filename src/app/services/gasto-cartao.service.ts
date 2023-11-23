import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GastoCartaoInput} from "../models/input/gasto-cartao.input";
import {Observable} from "rxjs";
import {GastoCartao} from "../models/gasto-cartao.model";

@Injectable({
  providedIn: 'root'
})
export class GastoCartaoService {

  private apiUrl = 'http://localhost:8080/api/compras'; // substitua pela sua URL

  constructor(private http: HttpClient) {
  }

  public listCompras(): Observable<GastoCartao[]> {
    return this.http.get<GastoCartao[]>(this.apiUrl);
  }

  public salvarCompra(compra: GastoCartaoInput): Observable<GastoCartao> {
    return this.http.post<GastoCartao>(this.apiUrl, compra);
  }
}
