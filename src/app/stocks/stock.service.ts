import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StockValues } from './models/stock-values.interface';
import { Stock } from './models/stock.interface';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  getAllStocks(): Observable<Stock[]> {
    return this.httpClient.get<Stock[]>(
      `${environment.apiUrl}Stocks`,
      this.httpOptions
    );
  }

  getStockValues(id: number): Observable<StockValues[]> {
    return this.httpClient.get<StockValues[]>(
      `${environment.apiUrl}Stocks/${id}`,
      this.httpOptions
    );
  }
}
