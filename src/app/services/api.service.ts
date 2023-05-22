import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiEndpoint = 'https://v3.football.api-sports.io';
  private headers = new HttpHeaders();
  private token: string = '';

  constructor(private http: HttpClient) {}

  setAuthToken(token: string) {
    this.token = token;
    this.updateHeaders();
  }

  private updateHeaders() {
    this.headers = new HttpHeaders({ 'x-apisports-key': this.token });
  }

  validarToken(token: string) {
    let url = `${this.apiEndpoint}/status`;
    const headers = new HttpHeaders({ 'x-apisports-key': token });
    return this.http.get(url, { headers });
  }

  obterPaises() {
    let url = `${this.apiEndpoint}/countries`;
    return this.http.get(url, { headers: this.headers });
  }

  obterTemporadas() {
    let url = `${this.apiEndpoint}/leagues/seasons`;
    return this.http.get(url, { headers: this.headers });
  }

  obterLigasPeloPais(pais: string) {
    let url = `${this.apiEndpoint}/leagues?code=${pais}`;
    return this.http.get(url, { headers: this.headers });
  }

  obterTimesPelaLiga(liga: string, temporada : string) {
    let url = `${this.apiEndpoint}/teams?league=${liga}&season=${temporada}`;
    return this.http.get(url, { headers: this.headers });
  }
}
