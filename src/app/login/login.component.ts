import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  apiKey : string = '';

  constructor(
    private apiService: ApiService,
    private router: Router) { }

  validarApiKey() {
    const apiKey = this.apiKey;
  
    this.apiService.validarToken(apiKey).subscribe(
      (response: any) => {
        if ('errors' in response && response.errors && Object.keys(response.errors).length > 0) {
          console.error('Erro ao validar o token:', response.errors);
        } else {
          console.log('Token valido:', response);
          this.apiService.setAuthToken(apiKey);
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        console.error('Erro ao validar o token:', error);
      }
    );
  }
  
  
}
