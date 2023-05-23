import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Chart } from 'chart.js/auto';

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
  jogadores: any[] = [];
  selectedTeam: string = '';
  nomeTime: string = '';
  totalJogos: string = '';
  vitorias: string = '';
  empates: string = '';
  derrotas: string = '';
  myChart!: Chart;

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
        console.log(response.response);
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
    this.apiService
      .obterTimesPelaLiga(selectedLeague, selectedSeason)
      .subscribe(
        (response: any) => {
          this.teams = response.response;
        },
        (error) => {
          console.error('Erro ao obter times:', error);
        }
      );
  }

  obterInformacoesTime() {
    this.preencherTabelaEstatisticasDoTime();
    this.preencherJogadores();
  }

  preencherJogadores() {
    const liga = this.selectedLeague.toString();
    const temporada = this.selectedSeason.toString();
    const time = this.selectedTeam.toString();

    this.apiService.obterJogadores(liga, temporada, time).subscribe(
      (response: any) => {
        console.log(response.response)
        this.jogadores = response.response;
      },
      (error) => {
        console.error('Erro ao obter jogadores:', error);
      }
    );
  }

  preencherTabelaEstatisticasDoTime() {
    const liga = this.selectedLeague.toString();
    const temporada = this.selectedSeason.toString();
    const time = this.selectedTeam.toString();

    this.apiService.obterEstatisticasDoTime(liga, temporada, time).subscribe(
      (response: any) => {
        this.nomeTime = response.response.team.name;
        this.totalJogos = response.response.fixtures.played.total;
        this.vitorias = response.response.fixtures.wins.total;
        this.empates = response.response.fixtures.draws.total;
        this.derrotas = response.response.fixtures.loses.total;
        this.criarGraficoGols(response);
      },
      (error) => {
        console.error('Erro ao obter estatísticas do time:', error);
      }
    );
  }

  criarGraficoGols(response: any) {
    console.log(response);
    const goalsData = {
      labels: [
        '0-15',
        '16-30',
        '31-45',
        '46-60',
        '61-75',
        '76-90',
        '91-105',
        '106-120',
      ],
      datasets: [
        {
          label: 'Gols por Minuto',
          data: [
            response.response.goals.for.minute['0-15'].total,
            response.response.goals.for.minute['16-30'].total,
            response.response.goals.for.minute['31-45'].total,
            response.response.goals.for.minute['46-60'].total,
            response.response.goals.for.minute['61-75'].total,
            response.response.goals.for.minute['76-90'].total,
            response.response.goals.for.minute['91-105'].total,
            response.response.goals.for.minute['106-120'].total || 0,
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };

    const ctx = document.getElementById('graficoGols') as HTMLCanvasElement;

    if (this.myChart) {
      this.myChart.destroy();
    }

    this.myChart = new Chart(ctx, {
      type: 'bar',
      data: goalsData,
      options: {
        scales: {
          y: {
            type: 'linear', 
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  }
}
