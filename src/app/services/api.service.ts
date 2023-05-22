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
}
