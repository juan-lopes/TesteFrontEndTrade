import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiEndpoint = 'https://v3.football.api-sports.io/status';
  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {}

  setAuthToken(token: string) {
    this.headers = this.headers.set('x-apisports-key', `${token}`);
  }

  validarToken(token: string) {
    const url = `${this.apiEndpoint}/status`;
    const headers = new HttpHeaders({ 'x-apisports-key': `${token}` });
    return this.http.get(url, { headers });
  }

  obterPaises() {
    const url = `${this.apiEndpoint}/countries`;
    return this.http.get(url);
  }

  obterLigasPeloPais(pais : string) {
    const url = `${this.apiEndpoint}/leagues?country=${pais}`;
    return this.http.get(url);
  }

  obterTemporadasDaLiga(pais : string) {
    const url = `${this.apiEndpoint}/leagues/seasons`;
    return this.http.get(url);
  }

  obterTimesPelaLigaETemporada(liga : string, temporada : string) {
    const url = `${this.apiEndpoint}/lteams?league=${liga}&season=${temporada}`;
    return this.http.get(url);
  }
}
