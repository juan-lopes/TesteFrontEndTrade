import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private authToken: string = '';

  constructor() { }

  isTokenValid(): boolean {
    return this.isAuthenticated;
  }

  setAuthToken(token: string) {
    this.authToken = token;
    this.isAuthenticated = true;
  }
}
