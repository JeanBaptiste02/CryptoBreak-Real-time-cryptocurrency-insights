import { Component, OnInit, ViewChild } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { NotificationService } from '../service/notification.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cryptomonnaies-list',
  templateUrl: './cryptomonnaies-list.component.html',
  styleUrls: ['./cryptomonnaies-list.component.css'],
})
export class CryptomonnaiesListComponent implements OnInit {
  isAdded: boolean = false;
  cryptocurrencies: any[] = [];
  trendingData: any = [];
  currency: string = 'EUR';
  chosenCrypto: any | null = null;
  loadingError: string | null = null;
  dataSources = new MatTableDataSource<any>([]);
  showcolumns: string[] = [
    'image',
    'id',
    'symbol',
    'name',
    'current_price',
    'actions',
    'toggleButton',
    'favorit',
  ];

  showcolumnspub: string[] = [
    'image',
    'id',
    'symbol',
    'name',
    'current_price',
    'actions',
  ];

  showcolumnsuser: string[] = [
    'image',
    'id',
    'symbol',
    'name',
    'current_price',
    'actions',
    'favorit',
  ];

  coinInformation: any;
  uniqueCoinId!: string;
  dataDurationInDays: number = 30;
  chosenCryptoGraphData: any;
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',
      },
    ],
    labels: [],
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1,
      },
    },
    plugins: {
      legend: { display: true },
    },
  };
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart!: BaseChartDirective;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: ApiService,
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticatedUser();
  }

  get isAuthenticatedUser(): boolean {
    return this.authService.isAuthenticatedUser();
  }

  private getTokenFromCookie(): string {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'token') {
        return value;
      }
    }
    return '';
  }

  // Inside your component class
  toggleCrypto(crypto: any): void {
    if (crypto.isAdded) {
      this.deleteCrypto(crypto);
    } else {
      this.addCrypto(crypto);
    }
    crypto.isAdded = !crypto.isAdded;
  }

  ngOnInit(): void {
    this.getTrendingDatas();
    this.fetchCoins();
    this.getCompleteDatas();
    this.getGraphData(this.dataDurationInDays);
    this.deleteCrypto(this);
    this.addCrypto(this);
  }

  getColumns() {
    if (this.isAdmin) {
      return this.showcolumns;
    } else if (this.isAuthenticated) {
      return this.showcolumnsuser;
    } else {
      return this.showcolumnspub;
    }
  }
  fetchCoins() {
    this.api.getCoins().subscribe(
      (data) => {
        this.cryptocurrencies = data;
        console.log('Coins from backend:', this.cryptocurrencies);
      },
      (error) => {
        console.error('Error fetching coins:', error);
      }
    );
  }

  getCompleteDatas() {
    this.api
      .getCoins()
      .pipe(
        retry(3),
        catchError((error) => {
          console.error('Error fetching data:', error);
          return throwError(error);
        })
      )
      .subscribe(
        (res) => {
          if (Array.isArray(res)) {
            this.cryptocurrencies = res;
            console.log('Every datas:', this.cryptocurrencies);
            this.dataSources = new MatTableDataSource<any>(
              this.cryptocurrencies
            );
            this.dataSources.paginator = this.paginator;
            this.dataSources.sort = this.sort;
          } else {
            console.error('Invalid data format:', res);
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  getTrendingDatas() {
    this.api.getTrendingCurrency(this.currency).subscribe(
      (res) => {
        console.log('Trending Data:', res);
        this.trendingData = res;
      },
      (error) => {
        console.error('Error fetching trending data:', error);
      }
    );
  }

  getGraphData(dataDurationInDays: number) {
    this.dataDurationInDays = dataDurationInDays;
    this.api
      .getGrpahicalCurrencyData(
        this.uniqueCoinId,
        //this.currency,
        this.dataDurationInDays
      )
      .subscribe((res) => {
        setTimeout(() => {
          this.myLineChart.chart?.update();
        }, 200);
        this.lineChartData.datasets[0].data = res.prices.map((a: any) => {
          return a[1];
        });
        this.lineChartData.labels = res.prices.map((a: any) => {
          console.log(
            'Data:',
            res.prices.map((a: any) => a[1])
          );
          console.log(
            'Labels:',
            res.prices.map((a: any) => {
              let date = new Date(a[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
              return this.dataDurationInDays === 1
                ? time
                : date.toLocaleDateString();
            })
          );
        });
      });
  }

  showDetails(crypto: any): void {
    console.log('Selected Crypto:', crypto);

    this.chosenCrypto = crypto;
    this.api
      .getGrpahicalCurrencyData(
        crypto.id,
        //this.currency,
        this.dataDurationInDays
      )
      .subscribe((graphData) => {
        this.chosenCryptoGraphData = graphData;
      });
  }

  gotoDetails(row: any) {
    this.router.navigate(['detailspage', row.id]);
  }

  deleteCrypto(crypto: any) {
    const token = this.getTokenFromCookie();
    this.api.deleteCrypto(crypto.name, token).subscribe(
      (response) => {
        console.log('Crypto supprimer avec succès:', response);
        this.fetchCoins();
        this.notificationService.showSuccessNotification(
          'La crypto-monnaie a été supprimée avec succès. '
        );
      },
      (error) => {
        console.error('Erreur lors de la suppristion de la crypto :', error);
        this.notificationService.showErrorNotification(
          'Erreur : La crypto-monnaie avait déjà été supprimée précédemment. 🔄'
        );
      }
    );
  }

  addCrypto(crypto: any): void {
    const token = this.getTokenFromCookie();
    this.api.addCrypto(crypto.name, token).subscribe(
      (response) => {
        console.log('Crypto ajoutée avec succès:', response);
        this.fetchCoins();
        this.notificationService.showSuccessNotification(
          'Crypto ajoutée avec succès ! 🌐💹'
        );
      },
      (error) => {
        console.error("Erreur lors de l'ajout de la crypto :", error);
        this.notificationService.showErrorNotification(
          'Erreur : Impossible d ajouter la crypto, elle existe déjà ! 🔄🚫'
        );
      }
    );
  }

  update(crypto: any): void {
    const token = this.getTokenFromCookie();
    this.api.updatecrypto(crypto.id, token).subscribe(
      (response) => {
        console.log('Crypto ajoutée avec succès:', response);
        this.fetchCoins();
        this.notificationService.showSuccessNotification(
          'Crypto ajoutée au favorit avec succès ! 🌐💹'
        );
      },
      (error) => {
        console.error(
          "Erreur lors de l'ajout de la crypto  au favorit:",
          error
        );
        this.notificationService.showErrorNotification(
          'Erreur : Impossible d ajouter la crypto, elle existe déjà ! 🔄🚫'
        );
      }
    );
  }
}
