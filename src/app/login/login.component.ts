import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  apiKey : string = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) { }

  validarApiKey() {
    const apiKey = this.apiKey;
  
    this.apiService.validarToken(apiKey).subscribe(
      (response: any) => {
        if ('errors' in response && response.errors && Object.keys(response.errors).length > 0) {
          this.toastr.error('Verifique se o token está correto e tente novamente', 'Token inválido!', {
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-top-right',
            timeOut: 3000,
            extendedTimeOut: 1000
          });
        } else {
          this.toastr.success('Token validado com sucesso!', '', {
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-top-right',
            timeOut: 3000,
            extendedTimeOut: 1000
          });
          this.apiService.setAuthToken(apiKey);
          this.authService.setAuthToken(apiKey)
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        this.toastr.error('Verifique se o token está correto e tente novamente', 'Token inválido!', {
          closeButton: true,
          progressBar: true,
          positionClass: 'toast-top-right',
          timeOut: 3000,
          extendedTimeOut: 1000
        });
      }
    );
  }
  
  
}
