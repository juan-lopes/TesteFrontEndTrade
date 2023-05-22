import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private apiService: ApiService) {}

  countries: any[] = [];
  selectedCountry: string = '';
  leagues: any[] = [];
  selectedLeague: string = '';
  seasons: any[] = [];
  selectedSeason: string = '';
  teams: any[] = [];
  selectedTeam: string = '';

  ngOnInit() {
    this.apiService.obterPaises().subscribe(
      (response: any) => {
        this.countries = response.response;
      },
      (error) => {
        console.error('Erro ao obter países:', error);
      }
    );
  }

  carregarLigasPorPais() {
    const selectedCountry = this.selectedCountry;
    this.apiService.obterLigasPeloPais(selectedCountry).subscribe(
      (response: any) => {
        this.leagues = response.response;
        console.log(response.response)
      },
      (error) => {
        console.error('Erro ao obter ligas:', error);
      }
    );
  }

  carregarTemporadas() {
    this.apiService.obterTemporadas().subscribe(
      (response: any) => {
        this.seasons = response.response;
      },
      (error) => {
        console.error('Erro ao obter temporadas:', error);
      }
    );
  }

  carregarTimesPelaLigaETemporada() {
    const selectedLeague = this.selectedLeague; 
    const selectedSeason = this.selectedSeason; 
    this.apiService.obterTimesPelaLiga(selectedLeague, selectedSeason).subscribe(
      (response: any) => {
        this.teams = response.response;
      },
      (error) => {
        console.error('Erro ao obter times:', error);
      }
    );
  }
}
